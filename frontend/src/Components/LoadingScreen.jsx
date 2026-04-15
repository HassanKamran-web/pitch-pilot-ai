import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';


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
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          color: '#F54900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoaderCircle size={60} strokeWidth={1.5} />
      </motion.div>

      
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