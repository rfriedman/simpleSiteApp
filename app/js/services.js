'use strict';

/* Services */

angular.module('siteService',[])

//provide site with configuration parameters 
//used by siteModel factory to get proper site

.provider("siteConfig",function(){
	var siteConfig;

	this.siteSettings = function(value){
		siteConfig = value;
	}

var Domain = new Object();
	Domain.settings = function(value){
		var settings = new Object();
		settings.siteID = function(){
			return value.siteID;
		}
		settings.name = function(){
			return value.siteName;
		}
		settings.apiBaseUrl = function(){
			return value.baseUrl;
		}
		return settings;
	}

	this.$get = function(){
			//function settings(){
				return {
					settings: Domain.settings(siteConfig)
				}
		//}
	}

})

.factory('domainCrudFactory',function(){


var Domain = new Object();
Domain.types = new Object();


	Domain.crud = new Object();
	Domain.crud.contacts = function(contactData){
		var crud = new Object();

		crud.createcontact = function(contact){

				contactData.push(contact);
				return contactData;
			}

		crud.updatecontact = function(contact){
			contactData.forEach(function(key, value){
				if(key.contactid == contact.id){
					key.firstname = contact.firstname;
	        key.lastname = contact.lastname;
				}
			})
	    return contactData;
		}
	  
	  crud.deletecontact = function(contact){
	    contactData.forEach(function(key, value){
				if(key.contactid == contact.id){
	        contactData.splice(value,1);
				}
			})
	    return contactData;
	  }

	return crud;
	}
})

.factory('domainTypesFactory',[function(){
var Domain = new Object();
	Domain.types = new Object();


Domain.types.contact = function(id,firstname,lastname){
	var contact = new Object();
		contact.contactid = id;
		contact.firstname = firstname;
		contact.lastname =	lastname;

	return contact;
}

Domain.types.siteinfo = function(id,sitename, siteheading, sitedesc){
		var siteinfo = new Object();

		siteinfo.siteid = id;
		siteinfo.sitename = sitename;
		siteinfo.siteheading = siteheading;
		siteinfo.sitedescription = sitedescription;

		return siteinfo;
}


}])

.factory('domainFactory',[function(){

var Domain = new Object();

Domain.model = function(siteData){
 	var site = new Object(); 
		site.contacts = function(){

			return siteData.contacts;

		}
		site.putcontacts = function(contactsData){
			siteData.contacts = contactData;
		}
		site.siteinfo = function(){

			return siteData.siteinfo;

		}
		site.putsiteinfo = function(siteInfoData){

			siteData.siteinfo = siteInfoData;
		}

		site.article = function(){

			return siteData.article;

		}
		site.putarticle = function(articleData){

			siteData.article = siteArticleData;
		}

		site.section = function(){

			return siteData.article.section;

		}
		site.putsection = function(sectionData){

			siteData.article.section = sectionData;
		}			
		
		site.all = function(){

			return siteData;
		}
		site.putall = function(siteData){

			siteData = siteData;
		}

	return site;
}	
return Domain;

}])

.service('modelInterface',['$http','domainFactory','$q','siteConfig',function($http,domainFactory,$q,siteConfig){
	var service = this,
	url = siteConfig.settings.apiBaseUrl();


service.domainModel = function(siteData){
	return domainFactory.model(siteData);

	} 

service.initData =	function (){
				
		var deffered = $q.defer();
		$http.get(url).then(
		  function(response){
		  		console.log(response.config);
				deffered.resolve(response);
		},function(reject){
				deffered.reject('service.initmodel: ' + reject.statusText);
		},function(final){
				console.log(final.statusText);
		})
		
		return deffered.promise;
	}

service.putData =function(siteData){
	var defferd =$q.defer();
	$http.put(url,siteData).then(
		function(response){
			console.log(response.statusText);
			deffered.resolve(response);

		},function(reject){
			console.log(reject.statusText);
			deffered.reject(reject);
		})
	return deffered.promise;
}	

}])


.factory('modelService',['modelInterface','$q',function(modelInterface,$q){

	var anyncModelData = modelInterface.initData();
	var asyncModel = new Object();
	
	asyncModel.data = function(){
		anyncModelData = modelInterface.initData();
	}
	
	asyncModel.domainModel = function (value){
		return modelInterface.domainModel(value);
	}

	asyncModel.init = function(){

		var deffered = $q.defer();
		anyncModelData.then(
			function(resolve){
				deffered.resolve(asyncModel.domainModel(resolve.data.site));
		},function(reject){
				console.log(reject.statusText);
		})

		return deffered.promise;
	}

	return asyncModel;


}])

.factory('modelWorkService',['modelInterface','$q'],function(modelInterface,$q){



})