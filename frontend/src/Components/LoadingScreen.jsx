// components/LoadingScreen.jsx
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react'; // Tum loader icon use kar sakte ho ya apni branding

// Colors from user:
// Background: #020618
// Primary/Buttons: #F54900

const LoadingScreen = () => {
  return (
    <div
      style={{
        backgroundColor: '#020618',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Icon with Pulse Animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1], // Scales up and down
          opacity: [1, 0.5, 1], // Fades in and out
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity, // Constant loop
          ease: "easeInOut"
        }}
        style={{
          color: '#F54900', // Primary orange
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <LoaderCircle size={60} strokeWidth={1.5} /> */}
        <img className='w-12 h-12' src="/favicon.png" alt="Pitch-Pilot"/>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          marginTop: '20px',
          letterSpacing: '2px',
          fontWeight: '300',
          fontSize: '14px',
          textTransform: 'uppercase',
        }}
      >
        Initializing Pitch-Pilot...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;