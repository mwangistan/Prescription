(function(){

    'use strict';

    angular.module('eprescription.pharmacists')
        .controller('PharmacistCtrl', ['$scope','$location', '$http', function($scope, $location, $http){

            var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            $scope.userInfo = userInfo;

            $scope.getPrescription = function(){
                $http({
                    method: 'POST',
                    url: 'http://104.155.102.226:8033/getprescription/',
                    data : {"code": $scope.code},
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    }
                }).success(function(data){
                    $scope.prescription = data.prescription;
                    $scope.prescriptionList = data.prescription.Drugs;
                    console.log(data);

                    $scope.issued = [];

                    $scope.issued.push(data.prescription.Drugs);




                    /*for(var i=0; i<data.prescription.length; i++){
                     $scope.drugs = data.prescription[i];
                     console.log($scope.drugs.full_name);

                     /!*console.log(data.prescription[i].full_name);*!/
                     }*/
                })
            }



            $scope.issueDrugs = function(){
                var pharmacist = JSON.parse(sessionStorage.getItem('userInfo'));
                var pharmacist_name = pharmacist.name;
                var pharmacist_number = "pharm00001";
                var patient_phone = $scope.prescription.PatientPhoneNumber;
                var member_insurance_number = $scope.prescription.memberInsCompany;
                var member_ins_company = $scope.prescription.memberInsNumber;

                for(var i=0; i<$scope.prescriptionList.length; i++){
                    $scope.prescriptionList[i].pharmacist_name = pharmacist_name;
                    $scope.prescriptionList[i].pharmacist_number = pharmacist_number;
                    $scope.prescriptionList[i].patient_phone_number = patient_phone;
                    $scope.prescriptionList[i].member_ins_number = member_insurance_number;
                    $scope.prescriptionList[i].member_ins_company = member_ins_company;
                    $scope.prescriptionList[i].days = 10;
                    $scope.prescriptionList[i].quantity = 10;

                }

                var prescription = $scope.prescriptionList;
                console.log(prescription);



                $http({
                    method: 'POST',
                    url: 'http://104.155.102.226:8033/issue_drugs/',
                    data: {'prescription': prescription},
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    }

                }).success(function(data){
                    console.log(data);

                }).error(function(data, status, headers, config){
                    console.log(data, status, headers);
                });



            };


        }]);
})();
