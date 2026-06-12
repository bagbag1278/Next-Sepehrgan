"use client";
import SecurityForm from "@/components/Dashboard/buyer/info/SecurityForm";
import { AnimatePresence, motion } from "framer-motion";
const Securitypage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=""
      >
        <SecurityForm />
      </motion.div>
    </AnimatePresence>
  );
};

export default Securitypage;
