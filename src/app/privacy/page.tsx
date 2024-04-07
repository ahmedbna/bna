export default function PrivacyPolicy() {
  return (
    <div className='container mx-auto p-12'>
      <h1 className='text-3xl font-bold mb-4'>{`Privacy Policy`}</h1>
      <p className='text-muted-foreground mb-8'>
        {`This privacy policy describes how BNA ("we," "us," or
        "our") collects, uses, and discloses your personal information when you
        use our website, mobile app, or other online services (collectively, the
        "Service").`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>{`Information We Collect`}</h2>
      <p className='text-muted-foreground mb-2'>
        {`We collect several different types of information for various purposes
        to improve our Service to you.`}
      </p>
      <ul className='list-disc pl-4 mb-8'>
        <li className='text-muted-foreground'>
          {` Personal Information: This may include information that can be used to
          identify you, such as your name, email address, phone number, profile image, or
          mailing address.`}
        </li>
        <li className='text-muted-foreground'>
          {`Usage Data: This may include information about your activity on the
          Service, such as the pages you visit, the time you spend on the
          Service, the features you use, and your IP address.`}
        </li>
        <li className='text-muted-foreground'>
          {`Tracking Data: We may use cookies and other tracking technologies to
          collect information about your browsing activity, interests, and
          preferences.`}
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mb-2'>{`Use of Your Information`}</h2>
      <p className='text-muted-foreground mb-2'>
        {`We use the information we collect for various purposes, including:`}
      </p>
      <ul className='list-disc pl-4 mb-8'>
        <li className='text-muted-foreground'>
          {`To provide and maintain the Service`}
        </li>
        <li className='text-muted-foreground'>
          {`To improve and personalize the Service`}
        </li>
        <li className='text-muted-foreground'>
          {`To send you marketing and promotional communications (with your consent)`}
        </li>
        <li className='text-muted-foreground'>
          {`To respond to your inquiries and requests`}
        </li>
        <li className='text-muted-foreground'>
          {`For security and fraud prevention purposes`}
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mb-2'>{`Sharing Your Information`}</h2>
      <p className='text-muted-foreground mb-2'>
        {`We may share your information with third-party service providers who
        help us operate the Service and improve your experience. We will only
        share your information with these third parties in accordance with this
        privacy policy.`}
      </p>
      <p className='text-muted-foreground mb-8'>
        {` We may also disclose your information if we are required by law to do so
        or if we believe it is necessary to protect the rights, property, or
        safety of ourselves or others.`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>{`Data Retention`}</h2>
      <p className='text-muted-foreground mb-8'>
        {`We will retain your information for as long as necessary to fulfill the
        purposes outlined in this privacy policy. We will also retain and use
        your information to the extent necessary to comply with our legal
        obligations, resolve disputes, and enforce our agreements.`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>{`Your Rights`}</h2>
      <p className='text-muted-foreground mb-2'>
        {`You have certain rights regarding your personal information, including:`}
      </p>
      <ul className='list-disc pl-4 mb-8'>
        <li className='text-muted-foreground'>
          {`The right to access your personal information`}
        </li>
        <li className='text-muted-foreground'>
          {`The right to rectify inaccurate personal information`}
        </li>
        <li className='text-muted-foreground'>
          {`The right to request the deletion of your personal information`}
        </li>
        <li className='text-muted-foreground'>
          {`To respond to your inquiries and requests`}
        </li>
        <li className='text-muted-foreground'>
          {`The right to object to the processing of your personal information`}
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mb-2'>{`Security`}</h2>
      <p className='text-muted-foreground mb-8'>
        {`We take the security of your data very seriously. We use a variety of
        security measures to protect your personal information, including secure
        servers, encryption, and firewalls. However, no method of transmission
        over the internet or method of electronic storage is 100% secure.
        Therefore, while we strive to use commercially acceptable means to
        protect your personal information, we cannot guarantee its absolute
        security.`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>{`Children's Privacy`}</h2>
      <p className='text-muted-foreground mb-8'>
        {`Our Service is not directed to children under the age of 13. We do not
        knowingly collect personal information from children under 13. If you
        are a parent or guardian and you are aware that your child has provided
        us with personal information, please contact us. If we become aware that
        we have collected personal information from a child under 13, we will
        take steps to delete the information from our servers.`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>
        {`Changes to This Privacy Policy`}
      </h2>
      <p className='text-muted-foreground mb-8'>
        {`We may update our privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on this page.`}
      </p>

      <h2 className='text-2xl font-semibold mb-2'>{`Contact Us`}</h2>
      <p className='text-muted-foreground mb-8'>
        {` If you have any questions about this privacy policy, please contact us
        by email at`}{' '}
        <a className='underline' href='mailto:hi@ahmedbna.com'>
          hi@ahmedbna.com
        </a>
      </p>
    </div>
  );
}
