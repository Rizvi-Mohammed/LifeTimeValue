"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let PersonalizationService = class PersonalizationService {
    customerExamples = [
        { location: "New York", acquisition: "Instagram Ad", ageCategory: "25-34", nationality: "American" },
        { location: "London", acquisition: "Referral", ageCategory: "35-44", nationality: "British" },
        { location: "Berlin", acquisition: "Google Search", ageCategory: "18-24", nationality: "German" }
    ];
    productInfo = {
        name: "ltv-brand Smart Home System",
        benefits: [
            "Reduces energy consumption by up to 40%",
            "Controlled via smartphone app",
            "Adapts to user habits automatically",
            "Works with existing home appliances"
        ],
        pricing: {
            basic: "$199",
            premium: "$349",
            trial: "30-day free trial"
        }
    };
    async generatePersonalizedEmail(userProfile) {
        try {
            const response = await axios_1.default.post('http://127.0.0.1:11434/api/generate', {
                model: 'llama2',
                prompt: `You are an expert email marketer who specializes in highly personalized communications.
                
                Product Info:
                ${JSON.stringify(this.productInfo, null, 2)}
                
                Customer Examples:
                ${JSON.stringify(this.customerExamples, null, 2)}
                
                Current Customer Profile:
                ${JSON.stringify(userProfile, null, 2)}
                
                Create a personalized marketing email that references the customer's location, age category, and cultural background. 
                The email should feel tailored specifically to them based on how they were acquired.
                Make cultural references appropriate to their nationality but keep them tasteful and not stereotypical.
                Include one call to action that's most appropriate for their profile.
                
                Provide your response as a JSON object with this structure:
                {
                  "subject": "<email subject line>",
                  "greeting": "<personalized greeting>",
                  "body": "<main email content>",
                  "callToAction": "<specific call to action>",
                  "closing": "<email closing>",
                  "personalizationPoints": ["<array of specific personalization elements used>"]
                }`,
                stream: false,
            });
            const rawText = response.data.response;
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            else {
                return this.getFallbackEmail(userProfile);
            }
        }
        catch (error) {
            console.error('Error calling LLM:', error);
            return this.getFallbackEmail(userProfile);
        }
    }
    getFallbackEmail(profile) {
        const locationGreeting = this.getLocationBasedGreeting(profile.location);
        return {
            subject: `${profile.nationality} Homes Love Our Smart System - Special Offer for ${profile.location}`,
            greeting: `${locationGreeting} from ltv-brand!`,
            body: `We noticed you found us through ${profile.acquisition}, and wanted to reach out with an offer tailored for ${profile.ageCategory} homeowners in ${profile.location}. As many ${profile.nationality} customers have discovered, our system adapts perfectly to local energy usage patterns and lifestyle preferences.`,
            callToAction: this.getAcquisitionBasedCTA(profile.acquisition),
            closing: "Looking forward to helping you build a smarter, more efficient home!",
            personalizationPoints: [
                `${profile.location}-specific greeting`,
                `${profile.nationality} cultural reference`,
                `${profile.acquisition} channel follow-up`,
                `${profile.ageCategory} demographic targeting`
            ]
        };
    }
    getLocationBasedGreeting(location) {
        const greetings = {
            "New York": "Hello from the city that never sleeps",
            "London": "Greetings from across the pond",
            "Berlin": "Guten Tag from ltv-brand",
            "Tokyo": "こんにちは (Konnichiwa)",
            "Paris": "Bonjour from ltv-brand"
        };
        return greetings[location] || `Hello from ltv-brand to ${location}`;
    }
    getAcquisitionBasedCTA(acquisition) {
        const ctas = {
            "Instagram Ad": "Tap the link in our bio to claim your exclusive Instagram follower discount!",
            "Referral": "To thank your friend who referred you, you'll both receive an extra 15% off when you purchase through this unique link.",
            "Google Search": "Since you found us through your research, we're offering a free consultation with our energy efficiency expert. Book now!",
            "Facebook": "As a member of our Facebook community, activate your special pricing by clicking here."
        };
        return ctas[acquisition] || "Click here to start your 30-day free trial with no obligation!";
    }
};
exports.PersonalizationService = PersonalizationService;
exports.PersonalizationService = PersonalizationService = __decorate([
    (0, common_1.Injectable)()
], PersonalizationService);
//# sourceMappingURL=personalization.service.js.map