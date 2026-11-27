'use strict';

const shortcutDefaults = [
  ['ChatGPT','https://chatgpt.com/','spark'], ['Gmail','https://mail.google.com/','mail'],
  ['Calendar','https://calendar.google.com/','calendar'], ['Drive','https://drive.google.com/','drive'],
  ['Canva','https://www.canva.com/','design'], ['GitHub','https://github.com/','code'],
  ['Google','https://www.google.com/','search']
];

const categoryDefaults = [
  ['My Businesses','business',[
    ['MKT Visibility','https://mktvisibility.com/'], ['MKT Colorado','https://mktcolorado.com/'],
    ['Loving Longmont','https://lovinglongmont.com/'], ['Open Theory Cove','https://opentheorycove.com/'],
    ['MKT Command Center','https://mktvisibility.github.io/mkt-visibility-command-center/']
  ]],
  ['Business Management','clipboard',[['Square Dashboard','https://squareup.com/dashboard'],['Google Sheets','https://sheets.google.com/']]],
  ['Artificial Intelligence','spark',[['ChatGPT','https://chatgpt.com/'],['Claude','https://claude.ai/'],['Google AI','https://ai.google/']]],
  ['Job Search','briefcase',[['Indeed','https://www.indeed.com/'],['LinkedIn Jobs','https://www.linkedin.com/jobs/'],['Connecting Colorado','https://www.connectingcolorado.com/']]],
  ['Social Media','people',[['Facebook','https://www.facebook.com/'],['Instagram','https://www.instagram.com/'],['Pinterest','https://www.pinterest.com/']]],
  ['Website Management','code',[['GitHub','https://github.com/'],['Google Search Console','https://search.google.com/search-console/']]],
  ['Marketing','marketing',[['Google Trends','https://trends.google.com/'],['Google Analytics','https://marketingplatform.google.com/about/analytics/']]],
  ['Graphic Design','design',[['Canva','https://www.canva.com/'],['Adobe Express','https://www.adobe.com/express/']]],
  ['Photography','camera',[['Adobe Lightroom','https://lightroom.adobe.com/'],['Pexels','https://www.pexels.com/']]],
  ['Online Stores','store',[['MKT Colorado Shop','https://mkt-colorado.printify.me/'],['Open Theory Cove on Etsy','https://www.etsy.com/shop/OpenTheoryCove'],['Printify','https://printify.com/']]],
  ['Shopping','bag',[['Target','https://www.target.com/'],['Walmart','https://www.walmart.com/']]],
  ['Finances','wallet',[['IRS','https://www.irs.gov/'],['Annual Credit Report','https://www.annualcreditreport.com/']]],
  ['Health and Wellness','heart',[['MedlinePlus','https://medlineplus.gov/'],['Connect for Health Colorado','https://connectforhealthco.com/']]],
  ['Productivity','checklist',[['Google Drive','https://drive.google.com/'],['Google Keep','https://keep.google.com/']]],
  ['Entertainment','play',[['YouTube','https://www.youtube.com/'],['Spotify','https://open.spotify.com/']]],
  ['News and Weather','cloud',[['National Weather Service','https://www.weather.gov/'],['Colorado Public Radio','https://www.cpr.org/']]],
  ['Travel','map',[['Google Maps','https://maps.google.com/'],['Colorado Road Conditions','https://www.cotrip.org/']]],
  ['Education','school',[['IBM SkillsBuild','https://skillsbuild.org/'],['Khan Academy','https://www.khanacademy.org/']]],
  ['Personal Resources','pin',[['City of Longmont','https://longmontcolorado.gov/'],['Longmont Library','https://longmontcolorado.gov/library/']]],
  ['Favorites','star',[['Google Search','https://www.google.com/'],['Open Theory Cove','https://opentheorycove.com/']]]
];
