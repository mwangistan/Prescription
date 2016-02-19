(function(){

    'use strict';

    angular.module('eprescription.doctors')
        .controller('DoctorsCtrl', DoctorsCtrl);

    DoctorsCtrl.$injector = ['$scope', '$http'];

    function DoctorsCtrl($scope, $http){

        $scope.registerPatient = function(){
            $http({

                method: 'POST',
                url: 'http://104.155.102.226:8033/patients/',
                data: {
                    'first_name':$scope.fname,
                    'last_name':$scope.lname,
                    'other_names':$scope.oname,
                    'phone':$scope.phone

                },
                headers: {
                    'accept':'application/json',
                    'Content-Type':'application/json'
                }

            }).success(function(data){
                localStorage.setItem('patientInfo',JSON.stringify(data));


            }).error(function(error, status){

            });
        }

                $scope.getInsurance = function(){
            console.log("The function fired");
            $http({

                method: 'GET',
                url: 'http://104.155.92.67/api/v1/insurers/',
                headers: {
                    'accept':'application/json',
                    'Content-Type':'application/json'
                }

            }).success(function(data){
                var insurers = [];
                //
                //console.log(data.results[0].company_name);

                for(var i = 0; i< data.results.length; i++){
                    var obj = data.results[i];
                    //console.log(obj);



                    insurers.push(obj);

                    console.log(insurers);

                    $scope.insurer = insurers;



                    //console.log($scope.insurer);
                    //$scope.insurers = obj;
                    //$scope.id = obj.id;
                    //$scope.name = obj.company_name;

                    //var id;
                    //var company_name;

                    //for(var key in obj){
                    //    id = key;
                    //    company_name = obj[key];
                    //    console.log(id + "  " + company_name);
                    //}
                }


            }).error(function(error, status){

            });
        };

        //Selecting and insurance from the drop down list
        $scope.selectedInsurance = function(){
            console.log($scope.insurance.id);
            $scope.insrance_id = $scope.insurance.id;

            console.log($scope.insurance.id);

        };


        $scope.addPrescription = function (){
            //post data to the database
            //$http.post().success(function(data){
            var prescription =$scope.drugs;
            console.log(prescription);
            $http({

                method: 'POST',
                url: 'http://104.155.102.226:8033/addprescription/',
                data: {
                    'prescription':prescription
                },
                headers: {
                    'accept':'application/json',
                    'Content-Type':'application/json'
                }

            }).success(function(response){
                $scope.drugs = [];
                $scope.success_response = response.signal;
                sessionStorage.removeItem('prescription');
    
            });

        }

         //Find patient function
        $scope.findPatient = function (){
            console.log("Function is firing " + $scope.insurance);
            $http({

                method: 'POST',
                url: 'http://104.155.102.226:8033/findinsuredpatient/',
                data: {
                    'insurance_company':$scope.insurance.id,
                    'member_number': $scope.number
                },
                headers: {
                    'accept':'application/json',
                    'Content-Type':'application/json'
                }

            }).success(function(data){

                sessionStorage.setItem('memberData', JSON.stringify(data));

                console.log(sessionStorage.getItem('memberData'));

            }).error(function(error){
                console.log(error);
            });

        };


        $scope.searchDrug = function() {

            $scope.showSpinner = 1;

            var dataList = document.getElementById('alldrugs');
            //search drug from rxnorm database
            $http({

                method: 'POST',
                url: 'http://104.155.102.226:8033/getdrug/',
                data: {
                    "full_name":$scope.drug_name
                },
                headers: {
                    'accept':'application/json',
                    'Content-Type':'application/json'
                }

            }).success(function(data){
                 var drug_full_name = JSON.parse(data); 

                for(var i= 0; i<drug_full_name.length; i++){
                    var option = document.createElement('option');
                    option.value = drug_full_name[i].full_name;
                    dataList.appendChild(option);
                }

                $scope.showSpinner = 0;
                

            });

        }

        $scope.addDrug = function(){

            
            $scope.drugs = [{doctor_number:'doc00001', member_ins_number:'823892389', member_ins_company:'Jubilee', patient_phone_number:'0700123456', pharmacy_name:'Haltons Pharmacy', diagnosis: '', dosage:'', full_name:'', sig:'', refills:'', status:'', comments:''}];
            for(var i=0; i<$scope.drugs.length; i++){
                $scope.drugs[i].full_name = $scope.drug_name;
            }

            if(JSON.parse(sessionStorage.getItem('prescription')) == null){
                sessionStorage.setItem('prescription', JSON.stringify($scope.drugs));
                $scope.drugs = JSON.parse(sessionStorage.getItem('prescription'));
            } else{
                var exists = JSON.parse(sessionStorage.getItem('prescription'));
                sessionStorage.clear();

                for(var i=0; i<exists.length; i++){
                    $scope.drugs.push(exists[i]);
                }
                sessionStorage.setItem('prescription', JSON.stringify($scope.drugs));
                $scope.drugs = JSON.parse(sessionStorage.getItem('prescription'));
            }



        }

          $scope.getPrescription = function() {
            $http({
                method: 'POST',
                url: 'http://104.155.102.226:8033/getprescription/',
                data: {
                    'code': $scope.code
                },
                headers: {
                    'Content-Type':'application/json',
                    'accept': 'application/json'
                }
            }).success(function(data){

                var prescription = [];
                console.log("Data was sent back successfully");

                console.log(data);

                for(var i=0; i<data.prescription.length; i++){
                    console.log(data.prescription[i].full_name);
                    var objInsurer = data.prescription[i];

                    prescription.push(objInsurer);

                    $scope.prescription = prescription;
                }


            }).error(function(){

            });
        }
        $scope.changePrescription = function(){
            console.log($scope.prescription);




            $http({
                method: 'PUT',
                url: 'http://104.155.102.226:8033/addprescription/',
                data: {
                    'prescription': $scope.prescription
                },
                headers: {
                    'Content-Type':'application/json',
                    'accept':'application/json',
                    'Access-Control-Allow-Methods':'PUT'
                }
            }).success(function(data){

                console.log("Data successfully saved");

            }).error(function(){

            });
        };

        $scope.getPrescriptions = function(){

            $http({
                method: 'POST',
                url: 'http://104.155.102.226:8033/recentprescriptions',
                data: {
                    'doctor_number': $scope.doctor_number
                },
                headers: {
                    'Content-Type':'application/json',
                    'accept':'application/json'
                }
            }).success(function(data){
                console.log(data);
                var prescription = [];

                for(var i=0; i<data.prescriptionList.length; i++){
                    console.log(data.prescriptionList[i].full_name);
                    var objInsurer = data.prescriptionList[i];

                    prescription.push(objInsurer);

                    $scope.prescriptions = prescription;
                    console.log($scope.prescriptions);
                }


            }).error(function(){

            });

        };



    }

})();
