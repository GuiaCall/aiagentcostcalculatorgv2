import { Calculator } from "@/components/Calculator";
import { FormulaExplanation } from "@/components/FormulaExplanation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            AI Voice Agent Cost Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate the costs of your AI voice agent implementation
          </p>
        </div>
        <Calculator />
        <FormulaExplanation />
      </div>
    </div>
  );
};

export default Index;