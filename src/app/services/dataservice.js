(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('Dataservice', Dataservice);

  Dataservice.$inject = ['$http', '$q'];

  function Dataservice($http, $q) {

    /**
     * Static list of contacts for prototype from fakedata
     * @type {Array}
     */
    var contacts = [
      {"company":"Ward and Sons","firstName":"Rosanna","lastName":"Kunze","street":"0752 Franecki Freeway","city":"Ivory fort","state":"NE","zip":"58335","phone":"916.164.1732 x974","email":"Trevion.Lockman@hotmail.com"},
      {"company":"Schiller, Romaguera and Baumbach","firstName":"Chelsie","lastName":"Kuvalis","street":"9687 Stamm Shoals","city":"Feest stad","state":"VA","zip":"11189","phone":"014-456-6587","email":"Lola.Wilderman15@yahoo.com"},
      {"company":"Bartell - Bailey","firstName":"Kayla","lastName":"Stamm","street":"9072 Norwood Loop","city":"Dusty fort","state":"IL","zip":"34035","phone":"1-742-165-9886","email":"Alfredo_Purdy@yahoo.com"},
      {"company":"Denesik - Rohan","firstName":"Claire","lastName":"Cruickshank","street":"034 Kuphal Crossroad","city":"Jacobi view","state":"MN","zip":"20712","phone":"167-468-6804","email":"Wyman_McClure73@gmail.com"},
      {"company":"Hegmann - Little","firstName":"Sarai","lastName":"Keebler","street":"412 Johann Forge","city":"West Lorenz town","state":"CT","zip":"29041-7648","phone":"480-495-4591 x20525","email":"Jabari32@gmail.com"},
      {"company":"Smitham, Tillman and Breitenberg","firstName":"Alanis","lastName":"Bernier","street":"3089 German Track","city":"Ralph bury","state":"AK","zip":"94928","phone":"834-413-1677 x9940","email":"Taurean64@gmail.com"},
      {"company":"Schmidt, Anderson and Boyer","firstName":"Malinda","lastName":"Botsford","street":"50159 Goodwin Fall","city":"West Cary borough","state":"MT","zip":"09903","phone":"(951) 535-7230 x6845","email":"Grace_Keebler@yahoo.com"},
      {"company":"Howe - Metz","firstName":"Sanford","lastName":"Leuschke","street":"736 Bartell Mill","city":"Botsford land","state":"ME","zip":"40735","phone":"1-509-148-6447 x889","email":"Mallie.Kris40@hotmail.com"},
      {"company":"Windler - Zieme","firstName":"Manuel","lastName":"Goodwin","street":"72232 Dooley Circle","city":"Boyle borough","state":"DE","zip":"65231","phone":"(431) 705-9910","email":"Marvin.Reinger@yahoo.com"},
      {"company":"Armstrong, Kshlerin and Schmeler","firstName":"Hyman","lastName":"Muller","street":"54390 Cremin Drive","city":"Lake Neha","state":"DE","zip":"06260","phone":"991-879-9019 x6137","email":"Ernie4@yahoo.com"},
      {"company":"Beier, Hilpert and Kemmer","firstName":"Katrine","lastName":"Crooks","street":"7498 Medhurst Squares","city":"Gene shire","state":"FL","zip":"95778","phone":"(378) 752-1947","email":"Hershel.Hyatt79@hotmail.com"},
      {"company":"Jacobi, Heidenreich and Buckridge","firstName":"Nathen","lastName":"Kuvalis","street":"94370 Justyn Flats","city":"Port Felicia berg","state":"ME","zip":"59930","phone":"1-845-907-8647","email":"Letha56@hotmail.com"},
      {"company":"Rau Inc","firstName":"Kaleb","lastName":"Gibson","street":"9448 Stiedemann Coves","city":"Prosacco view","state":"CT","zip":"46962","phone":"(451) 030-0987 x2010","email":"Adella65@yahoo.com"},
      {"company":"Weimann - Littel","firstName":"Rasheed","lastName":"Schmidt","street":"938 Considine Spur","city":"West Zora chester","state":"AL","zip":"10826","phone":"395-913-2807","email":"Michelle72@gmail.com"},
      {"company":"Heidenreich, Ward and Green","firstName":"Dayton","lastName":"Mosciski","street":"23351 Jazmin Inlet","city":"Beatty ville","state":"AL","zip":"44379","phone":"660-795-7221 x379","email":"Dulce.Wyman43@yahoo.com"},
      {"company":"Morar Group","firstName":"Kenyon","lastName":"Langosh","street":"4552 Hoppe Plaza","city":"Bode bury","state":"DE","zip":"68007-0271","phone":"(660) 897-4224 x71788","email":"Damion_Kassulke@hotmail.com"},
      {"company":"Stanton LLC","firstName":"Travis","lastName":"Witting","street":"77291 Davis Isle","city":"Boyer furt","state":"SD","zip":"89780","phone":"(648) 712-6961 x6860","email":"Izaiah_Ullrich37@gmail.com"},
      {"company":"Funk - Lynch","firstName":"Jett","lastName":"Marquardt","street":"33678 Balistreri Mount","city":"East Lorena furt","state":"WY","zip":"29117","phone":"1-901-467-4337","email":"Donna.King6@yahoo.com"},
      {"company":"Larson LLC","firstName":"Jasper","lastName":"Emard","street":"637 Syble Parkways","city":"Alexandra bury","state":"TX","zip":"52596","phone":"441-551-1007 x79203","email":"Ila_Bauch@hotmail.com"},
      {"company":"Anderson - Schmeler","firstName":"Daisy","lastName":"Moore","street":"8643 Blanda Greens","city":"North Harvey","state":"MD","zip":"10785","phone":"1-833-861-8424 x347","email":"Annetta.Goyette@gmail.com"},
      {"company":"Glover - Schaden","firstName":"Casimir","lastName":"Stamm","street":"3045 Fatima Junction","city":"Abelardo ton","state":"ME","zip":"10853-6677","phone":"(567) 800-2777 x277","email":"Favian74@gmail.com"},
      {"company":"Veum - Gislason","firstName":"Sam","lastName":"Trantow","street":"66123 Bogan Roads","city":"Von shire","state":"NE","zip":"35655-1578","phone":"1-555-487-1757 x44849","email":"Dejon32@yahoo.com"},
      {"company":"Hegmann Group","firstName":"Julian","lastName":"Walker","street":"514 Stiedemann Shore","city":"Reinger stad","state":"WV","zip":"77684-7755","phone":"668.619.4513 x75783","email":"Lukas.Williamson42@hotmail.com"},
      {"company":"Cormier and Sons","firstName":"Evan","lastName":"Leffler","street":"620 Lehner Bridge","city":"Nolan side","state":"TX","zip":"83438-5257","phone":"535.983.5217 x1673","email":"Carolyn_Parisian@yahoo.com"},
      {"company":"Johns - Gibson","firstName":"Devyn","lastName":"Purdy","street":"48785 Kuhic Wall","city":"Lawson furt","state":"NY","zip":"10114-3898","phone":"978-308-8958 x208","email":"Floy93@hotmail.com"},
      {"company":"Ferry and Sons","firstName":"Everett","lastName":"Schneider","street":"17215 Lisette Rue","city":"East Clemens mouth","state":"NJ","zip":"98399","phone":"520.129.0208 x00099","email":"Victor55@gmail.com"},
      {"company":"Price - Kilback","firstName":"Liza","lastName":"Macejkovic","street":"51039 Klocko Walk","city":"Port Edgardo port","state":"ND","zip":"21397-0452","phone":"1-497-300-2879 x375","email":"Adan83@yahoo.com"},
      {"company":"Fisher - Mraz","firstName":"Maria","lastName":"Wintheiser","street":"4192 Brady Ridge","city":"North Marcelina fort","state":"NE","zip":"24487","phone":"639.813.3884","email":"Quentin4@hotmail.com"},
      {"company":"Crooks, Fadel and Mills","firstName":"Marlee","lastName":"Feest","street":"66280 Collins Freeway","city":"East Henri","state":"NY","zip":"65104-1949","phone":"996.680.7356 x77499","email":"Sandrine_Veum27@gmail.com"}
    ].map(function (contact, index) {
      return Object.assign({id: String(index)}, contact);
    });

    return {
      getContacts: getContacts,
      getContact: getContact
    };

    /**
     * retrieves/returns list of contacts
     * @returns {Promise}
     */
    function getContacts() {
      return $q.when(contacts);
    }

    /**
     * retrieves/returns single contact by ID
     * @param id
     * @returns {*}
     */
    function getContact(id) {
      var contact = contacts.filter(function(contact) {
        return (contact.id === id);
      }).pop();

      return $q.when(contact);
    }

  }

})();
