const stateAvg = { txPerUser:57.3722392215, merchantDensity:60.9429104291, txGrowth:6.0295153906 };
const districts = [
{name:'Solapur',tx:234327059,users:2688732,merchants:178647,txPerUser:87.1515,merchantDensity:66.4428,txGrowth:5.9574,priority:true,signal:'Highest demand-to-acceptance gap in this candidate set; transaction intensity is ~52% above the district mean.'},
{name:'Dharashiv',tx:72380736,users:866411,merchants:56399,txPerUser:83.5409,merchantDensity:65.0950,txGrowth:8.5115,priority:true,signal:'High transaction intensity plus above-average QoQ momentum; useful test bed outside the largest metros.'},
{name:'Latur',tx:114882213,users:1416945,merchants:90127,txPerUser:81.0774,merchantDensity:63.6066,txGrowth:8.0237,priority:true,signal:'Strong demand intensity with merchant density close to the state mean; a clean activation hypothesis.'},
{name:'Nanded',tx:131031097,users:1764475,merchants:100568,txPerUser:74.2607,merchantDensity:56.9960,txGrowth:11.7493,priority:true,signal:'Fastest growth among the selected districts with below-average merchant density.'},
{name:'Parbhani',tx:65772822,users:907133,merchants:50831,txPerUser:72.5063,merchantDensity:56.0348,txGrowth:11.0551,priority:true,signal:'High growth and below-average merchant density create a strong testable acceptance-side hypothesis.'},
{name:'Chh. Sambhaji Nagar',tx:277774357,users:3285314,merchants:222633,txPerUser:84.5503,merchantDensity:67.7661,txGrowth:6.0733,priority:false},
{name:'Beed',tx:110400541,users:1411573,merchants:87769,txPerUser:78.2110,merchantDensity:62.1782,txGrowth:10.8679,priority:false},
{name:'Pune',tx:1190115541,users:14753740,merchants:1261805,txPerUser:80.6653,merchantDensity:85.5244,txGrowth:3.4816,priority:false},
{name:'Nashik',tx:326726159,users:4715835,merchants:331234,txPerUser:69.2828,merchantDensity:70.2387,txGrowth:5.8390,priority:false},
{name:'Yavatmal',tx:68274135,users:1276959,merchants:52956,txPerUser:53.4662,merchantDensity:41.4704,txGrowth:7.3466,priority:false},
{name:'Nagpur',tx:229616391,users:4040766,merchants:307247,txPerUser:56.8250,merchantDensity:76.0368,txGrowth:4.1989,priority:false},
{name:'Thane',tx:346477174,users:8346491,merchants:741350,txPerUser:41.5117,merchantDensity:88.8218,txGrowth:2.6521,priority:false},
{name:'Mumbai Suburban',tx:281998060,users:7625449,merchants:749720,txPerUser:36.9812,merchantDensity:98.3181,txGrowth:.7396,priority:false}
];

function idx(v, avg){ return v/avg; }
function pct(v){return `${v>=0?'+':''}${v.toFixed(1)}%`}
function compact(v){return new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:1}).format(v)}

const cards = document.getElementById('districtCards');
districts.filter(d=>d.priority).forEach(d=>{
  const demand=idx(d.txPerUser,stateAvg.txPerUser)*100;
  const accept=idx(d.merchantDensity,stateAvg.merchantDensity)*100;
  cards.insertAdjacentHTML('beforeend',`<article class="district-card">
    <h3>${d.name}</h3>
    <div class="gap">+${(demand-accept).toFixed(0)} pts</div><div class="gap-label">demand - acceptance index</div>
    <dl>
      <dt>Transactions / user</dt><dd>${d.txPerUser.toFixed(1)}</dd>
      <dt>Merchants / 1K users</dt><dd>${d.merchantDensity.toFixed(1)}</dd>
      <dt>Q2 transactions</dt><dd>${compact(d.tx)}</dd>
      <dt>QoQ tx growth</dt><dd>${pct(d.txGrowth)}</dd>
      <dt>Demand index</dt><dd>${demand.toFixed(0)}</dd>
      <dt>Acceptance index</dt><dd>${accept.toFixed(0)}</dd>
    </dl>
    <div class="signal">${d.signal}</div>
  </article>`)
});

const svg=document.getElementById('scatter');
const W=900,H=470,m={l:70,r:28,t:28,b:58};
const xmin=35,xmax=102,ymin=30,ymax=92;
const x=v=>m.l+(v-xmin)/(xmax-xmin)*(W-m.l-m.r);
const y=v=>H-m.b-(v-ymin)/(ymax-ymin)*(H-m.t-m.b);
let html='';
[40,50,60,70,80,90,100].forEach(v=>{html+=`<line class="grid" x1="${x(v)}" y1="${m.t}" x2="${x(v)}" y2="${H-m.b}"/><text class="label" x="${x(v)}" y="${H-28}" text-anchor="middle">${v}</text>`});
[40,50,60,70,80,90].forEach(v=>{html+=`<line class="grid" x1="${m.l}" y1="${y(v)}" x2="${W-m.r}" y2="${y(v)}"/><text class="label" x="${m.l-12}" y="${y(v)+4}" text-anchor="end">${v}</text>`});
html+=`<line class="axis" x1="${m.l}" y1="${H-m.b}" x2="${W-m.r}" y2="${H-m.b}"/><line class="axis" x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H-m.b}"/>`;
html+=`<text class="label" x="${(W+m.l-m.r)/2}" y="${H-8}" text-anchor="middle">Registered merchants per 1,000 registered users →</text>`;
html+=`<text class="label" transform="translate(18 ${(H+m.t-m.b)/2}) rotate(-90)" text-anchor="middle">Q2 transactions per registered user →</text>`;
html+=`<line x1="${x(stateAvg.merchantDensity)}" y1="${m.t}" x2="${x(stateAvg.merchantDensity)}" y2="${H-m.b}" stroke="#9c82b9" stroke-dasharray="5 5"/><line x1="${m.l}" y1="${y(stateAvg.txPerUser)}" x2="${W-m.r}" y2="${y(stateAvg.txPerUser)}" stroke="#9c82b9" stroke-dasharray="5 5"/>`;
districts.forEach(d=>{const cls=d.priority?'priority-label':'point-label'; const fill=d.priority?'#5f259f':'#b7aebb'; const r=d.priority?7:5; html+=`<g><circle class="point" cx="${x(d.merchantDensity)}" cy="${y(d.txPerUser)}" r="${r}" fill="${fill}"><title>${d.name}: ${d.txPerUser.toFixed(1)} tx/user, ${d.merchantDensity.toFixed(1)} merchants/1K users</title></circle><text class="${cls}" x="${x(d.merchantDensity)+9}" y="${y(d.txPerUser)-8}">${d.name}</text></g>`});
svg.innerHTML=html;
