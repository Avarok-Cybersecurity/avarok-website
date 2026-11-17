import { expect, test } from '@playwright/test';

// The contact form's outcomes, with the email service intercepted: no real message is sent.
const EMAILJS = 'https://api.emailjs.com/**';

async function fillAndSend(page: import('@playwright/test').Page): Promise<void> {
  await page.goto('/#contact');
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('A message that must survive a failure.');
  await page.getByRole('button', { name: 'Send message' }).click();
}

test('a failed send interrupts with an alert, keeps the message, offers email, and keeps focus', async ({ page }) => {
  await page.route(EMAILJS, (route) => route.fulfill({ status: 500, body: 'no' }));
  await fillAndSend(page);
  const alert = page.getByRole('alert');
  await expect(alert).toContainText("Your message wasn't sent, and it is still in the form.");
  await expect(alert.getByRole('link', { name: 'email contact@avarok.net' })).toHaveAttribute('href', /^mailto:contact@avarok\.net\?subject=/);
  await expect(page.getByLabel('Message')).toHaveValue('A message that must survive a failure.');
  await expect(page.getByRole('button', { name: 'Send message' })).toBeFocused();
  await expect(page.locator('#form-status')).toHaveText('');
});

test('a successful send is announced as a status and clears the form', async ({ page }) => {
  await page.route(EMAILJS, (route) => route.fulfill({ status: 200, body: 'OK' }));
  await fillAndSend(page);
  await expect(page.getByRole('status')).toHaveText("Message sent! We'll get back to you as soon as possible.");
  await expect(page.getByRole('alert')).toHaveText('');
  await expect(page.getByLabel('Message')).toHaveValue('');
});

test('while sending, a second submit sends nothing more', async ({ page }) => {
  let calls = 0;
  let release: () => void = () => {};
  const held = new Promise<void>((r) => { release = r; });
  await page.route(EMAILJS, async (route) => { calls += 1; await held; await route.fulfill({ status: 200, body: 'OK' }); });
  await fillAndSend(page);
  const button = page.getByRole('button', { name: 'Sending...' });
  await expect(button).toHaveAttribute('aria-disabled', 'true');
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter'); // a person pressing Enter again on the focused button
  release();
  await expect(page.getByRole('status')).toContainText('Message sent!');
  expect(calls).toBe(1);
});
