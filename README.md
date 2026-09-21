# PhonePe Growth Atlas — Maharashtra Q2 2026

Independent product proof-of-work by Jainil Trivedi.

## Product question
Where should PhonePe test the next merchant-growth experiment?

## Data
Official PhonePe Pulse public dataset, Q1 and Q2 2026, Maharashtra district-level:
- transaction count
- registered users
- registered merchants

PhonePe states that the current Pulse release has been refreshed/restated and includes data through Q2 2026. Registered merchant data is life-to-date unique merchants onboarded on the platform.

## Derived metrics
- Transactions per registered user = Q2 transactions / Q2 registered users
- Merchant density = Q2 registered merchants / Q2 registered users × 1,000
- Demand index = district transactions/user ÷ Maharashtra district mean
- Acceptance index = district merchant density ÷ Maharashtra district mean
- Demand-acceptance gap = demand index − acceptance index
- QoQ transaction growth = Q2 transaction count / Q1 transaction count − 1

## Priority hypothesis
Five districts were selected for experiment design: Solapur, Dharashiv, Latur, Nanded and Parbhani.

These are not claimed to be objectively “best.” They are a transparent prioritization hypothesis based on high transaction intensity relative to merchant density and/or strong Q2 transaction momentum.

## Important caveats
- Registered users are not the same as active users.
- Registered merchants are not the same as active merchants.
- Transaction intensity does not establish causality or unmet merchant demand.
- No demographic, category-mix, profitability, risk, or operational-capacity data is included.
- This is a hypothesis generator for experiment selection, not a production recommendation.

## Run
Open `index.html` directly or serve locally with:

```bash
python -m http.server 8000
```
