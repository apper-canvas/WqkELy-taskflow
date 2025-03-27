import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
          Have questions or need assistance with our Project Management Tool? 
          Our team is here to help. Reach out to us using the contact form below or through our contact information.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-6 h-full">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-light mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Office</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    123 Project Street<br />
                    Suite 456<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-electric/10 dark:bg-electric/20 p-3 rounded-full text-electric-dark dark:text-electric mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    <a href="mailto:support@projectmanagement.tool" className="hover:text-primary dark:hover:text-primary-light transition-colors">
                      support@projectmanagement.tool
                    </a>
                  </p>
                  <p className="text-surface-600 dark:text-surface-300 mt-1">
                    <a href="mailto:info@projectmanagement.tool" className="hover:text-primary dark:hover:text-primary-light transition-colors">
                      info@projectmanagement.tool
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-neon/10 dark:bg-neon/20 p-3 rounded-full text-neon-dark dark:text-neon-light mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    <a href="tel:+1-555-123-4567" className="hover:text-primary dark:hover:text-primary-light transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </p>
                  <p className="text-surface-600 dark:text-surface-300 mt-1">
                    Monday - Friday, 9AM - 6PM PST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-tropical/10 dark:bg-tropical/20 p-3 rounded-full text-tropical-dark dark:text-tropical-light mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-surface-100 dark:bg-surface-700 hover:bg-primary/10 dark:hover:bg-primary/20 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                
                <a 
                  href="#" 
                  className="bg-surface-100 dark:bg-surface-700 hover:bg-primary/10 dark:hover:bg-primary/20 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                <a 
                  href="#" 
                  className="bg-surface-100 dark:bg-surface-700 hover:bg-primary/10 dark:hover:bg-primary/20 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ContactForm />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the response time for contact form submissions?</h3>
              <p className="text-surface-600 dark:text-surface-300">
                We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our support line directly.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Do you offer on-site training for your project management tool?</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Yes, we provide customized on-site training for teams of 10 or more. Please contact our sales department for more information and pricing.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">How can I request a feature for the project management tool?</h3>
              <p className="text-surface-600 dark:text-surface-300">
                We value user feedback and continuously improve our product. You can submit feature requests through the contact form or by emailing our product team directly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;