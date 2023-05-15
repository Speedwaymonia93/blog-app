
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import ModalSubscribe from './Modal'
import React, {
    useState} from 'react'
const NewsletterSubscribe = ({isVisible, onClose}) => {

  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
    const [showModal, setShowModal] = useState(false);
  return (
    <MailchimpSubscribe
      url={ MAILCHIMP_URL }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
           <ModalSubscribe
                isVisible={ isVisible }
                onClose={()=>onClose()}
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
        );
      } }
    />
  );
};

export default NewsletterSubscribe;