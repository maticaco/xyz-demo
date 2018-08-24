# xyz-demo

The project is created for playing around with XYZ platform and editor. 
Implementation includes following file 
- implementation.js 

which has to be used from XYZ editor https://xyz.api.here.com/maps/ 
Please make sure you are using token which has access to specified layers. 

## Goal 
NOTE: data used in the app is not realistic data. It's randomly generated. However, there are
different sources which could be used to collect real data (e.g. https://reliefweb.int/sites/reliefweb.int/files/resources/South_Sudan_2018_Humanitarian_Needs_Overview.pdf )
NOTE: data is updated (properly tagged) only for middle-east region, e.g. Syria (as that region is currently impacted by refugy crisis)

Implementation is driven by real situation in which I had been few weeks ago. I had an opportunity to help people in Africa but I did not know what they need the most (sending money was not an option). At that moment I've realised that having information provided by someone who already visited such places could be useful. 

So, idea is to provide the info what is needed in specific area (polygons on the map). This information is provided using tags prefixed with (req_). From the other side, there are people who can to help (points on the map). Those points do have information such as name, email, phone and tag what they _could offer_. 
Possible values are:  
- education
- protection
- nutrition
- health
- food_security
- emerg_shelter
- water_hygiene
- camp_coord

Application itself reacts on the click on specific polygon. Once polygon is clicked, tags will be checked what is needed for specific city. Automatically, a search will be executed looking for points which do have corresponding tags. 
For example city has need for education. In that case tag _req_education_ is present. That means that search should look for points having tag _offers_education_ . All points found in circle of 100km will be applied with different style. 

Some screenshots attached in data folder. 

# TODO:
- some styling 
- refresh view after every selection (did not work as poits were disapearing, bug ?)
- idea could be extended to 3 different entities: those who need a help, those who can help, and those who could distribute the goods 