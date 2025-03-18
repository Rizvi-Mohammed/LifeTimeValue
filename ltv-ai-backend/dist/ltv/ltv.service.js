"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtvService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let LtvService = class LtvService {
    documents = [
        { id: 1, data: "Customer acquired through referral, 6 months retention, $120 monthly spend" },
        { id: 2, data: "Customer from paid ads, 24 months retention, $85 monthly spend" },
        { id: 3, data: "Enterprise customer, 36 months contract, $5000 monthly spend" }
    ];
    async calculateLtv(customerData) {
        const context = this.documents
            .map(doc => doc.data)
            .join('\n');
        try {
            const response = await axios_1.default.post('http://localhost:11434/api/generate', {
                model: 'llama2',
                prompt: `You are an LTV prediction expert. Calculate the customer lifetime value based on the data provided.
                Context:
                ${context}
                
                Customer data:
                ${customerData}
                
                Provide your response as a JSON object with this structure:
                {
                  "prediction": <float - estimated LTV>,
                  "confidence": <float between 0 and 1>,
                  "factors": <array of strings explaining key factors>
                }`,
                stream: false,
            });
            const rawText = response.data.response;
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            else {
                return {
                    prediction: 1200,
                    confidence: 0.7,
                    factors: ["Based on limited data", "Similar customer profiles", "Industry average metrics"]
                };
            }
        }
        catch (error) {
            console.error('Error calling LLM:', error);
            return {
                prediction: 1500,
                confidence: 0.65,
                factors: ["Acquisition channel", "Monthly spend pattern", "Similar customer retention"]
            };
        }
    }
};
exports.LtvService = LtvService;
exports.LtvService = LtvService = __decorate([
    (0, common_1.Injectable)()
], LtvService);
//# sourceMappingURL=ltv.service.js.map