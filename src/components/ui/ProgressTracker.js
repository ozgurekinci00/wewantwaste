import React from "react";
import {
  CheckIcon,
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  DocumentCheckIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

// Default steps - will use these if none are provided via props
const defaultSteps = [
  { id: "postcode", name: "Postcode", description: "Enter your location" },
  {
    id: "waste-type",
    name: "Waste Type",
    description: "Select waste category",
  },
  { id: "skip-size", name: "Skip Size", description: "Choose the right size" },
  { id: "permit", name: "Permit Check", description: "Verify permissions" },
  { id: "date", name: "Choose Date", description: "Select delivery time" },
  { id: "payment", name: "Payment", description: "Complete your order" },
];

// Icon mapping for each step
const getStepIcon = (stepId, isComplete) => {
  const iconClasses = "h-3 w-3 sm:h-4 sm:w-4";

  switch (stepId) {
    case "step-1":
    case "postcode":
      return <MapPinIcon className={iconClasses} />;
    case "step-2":
    case "waste-type":
      return <TrashIcon className={iconClasses} />;
    case "step-3":
    case "skip-size":
    case "select-skip":
      return <TruckIcon className={iconClasses} />;
    case "step-4":
    case "permit":
    case "permit-check":
      return <DocumentCheckIcon className={iconClasses} />;
    case "step-5":
    case "date":
    case "choose-date":
      return <CalendarIcon className={iconClasses} />;
    case "step-6":
    case "payment":
      return <CreditCardIcon className={iconClasses} />;
    default:
      return isComplete ? <CheckIcon className={iconClasses} /> : null;
  }
};

// Progress Tracker component
export const ProgressTracker = ({
  steps = defaultSteps,
  currentStep = "skip-size",
}) => {
  // Process steps to ensure they have a name property
  const processedSteps = steps.map((step) => ({
    ...step,
    name: step.name || step.label || step.id, // Fallback to label or id if name is not provided
  }));

  const currentStepIndex = processedSteps.findIndex(
    (s) => s.id === currentStep
  );

  return (
    <div className="hidden md:block w-full px-8">
      <div>
        <div className="relative py-2">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-1 w-[calc(100%-1rem)] h-1 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden" />

          {/* Animated Progress Bar */}
          <motion.div
            className="absolute top-1/2 left-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 -translate-y-1/2 rounded-full"
            style={{
              width: `${
                (currentStepIndex / (processedSteps.length - 1)) * 100
              }%`,
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${
                (currentStepIndex / (processedSteps.length - 1)) * 100
              }%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {processedSteps.map((step, index) => {
              const isComplete = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Circle with Icon */}
                  <motion.div
                    className={`
                    w-8 h-8 mb-3 rounded-full flex items-center justify-center z-10 hover:cursor-pointer
                    ${
                      isComplete
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                        : isCurrent
                        ? "bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 shadow-sm"
                        : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400"
                    }
                    transition-all duration-300
                  `}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {getStepIcon(step.id, isComplete)}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
