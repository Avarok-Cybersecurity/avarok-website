import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CookiePolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CookiePolicy = ({ open, onOpenChange }: CookiePolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cookie Policy for Avarok</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>This is the Cookie Policy for Avarok, accessible from avarok.net</p>
          <h3 className="text-lg font-semibold">What Are Cookies</h3>
          <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
          <h3 className="text-lg font-semibold">How We Use Cookies</h3>
          <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
          <h3 className="text-lg font-semibold">Disabling Cookies</h3>
          <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>
          <h3 className="text-lg font-semibold">The Cookies We Set</h3>
          <h4 className="font-semibold">Account related cookies</h4>
          <p>If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>
          <h4 className="font-semibold">Login related cookies</h4>
          <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
          <h4 className="font-semibold">Email newsletters related cookies</h4>
          <p>This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.</p>
          <h4 className="font-semibold">Orders processing related cookies</h4>
          <p>This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.</p>
          <h4 className="font-semibold">Surveys related cookies</h4>
          <p>From time to time we offer user surveys and questionnaires to provide you with interesting insights, helpful tools, or to understand our user base more accurately. These surveys may use cookies to remember who has already taken part in a survey or to provide you with accurate results after you change pages.</p>
          <h4 className="font-semibold">Forms related cookies</h4>
          <p>When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>
          <h4 className="font-semibold">Site preferences cookies</h4>
          <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
          <h3 className="text-lg font-semibold">Third Party Cookies</h3>
          <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
          <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
          <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
          <h3 className="text-lg font-semibold">More Information</h3>
          <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
          <p>For more general information on cookies, please read "Cookies" article from the Privacy Policy Generator.</p>
          <p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
          <p>Email: contact@avarok.net</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
