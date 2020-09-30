# Journey Info status mapping

Step to start the server locally

- Install dependencies
  `npm install`
- Start server if you have local mongo instance running
  `npm run start`
- Start server to directly check with MLAB instance configuration already done.
  `npm run start:dev`
- Server can be accible at
  `http://localhost:3000`
- To check the health of server
  `http://localhost:3000/health`
- To save the journey details like

```
     Method : POST
     URL : http://localhost:3000/api/journey
     Headers :  {
         Content-Type:application/json
     }
     PAYLOAD : {
                "profile": {
                    "mobileNumber": "8801823123",
                    "customerId": "asdfasdfasfasdfasdf11"
                },
                "journeyInfo": {
                    "journeyId": "8f14a65f-3032-42c8-a196-asdfsdf2311",
                    "journeyName": "LoanJourney1",
                    "journeyState": [
                        {
                            "action": "CUSTOMER_ONBOARDING_COMPLETE",
                            "journeyStateId": "journeyStateId-231221",
                            "formData": {
                                "dateTime": "1601230697061",
                                "disbursementMode": "CHEQUE",
                                "interestRate": "12",
                                "minimumProcessingFee": "22421",
                                "plan": "ABCD",
                                "tenure": "10"
                            },
                            "timeinfo": "1601230697061"
                        }
                    ]
                }
            }
```
