"use strict";

require("should");
var Nzh = require("../nzh");
var testData = require("./testData");
var toCN = testData.toCN;
var toMoney = testData.toMoney;
var custom = testData.custom;

function inTest(td,fn){
    describe(td.name,function(){
        if(td.its){
            for(var i=0; i<td.its.length; i++){
                inTest(td.its[i],fn);
            }
        }
        if(td.data){
            //console.log(td.data);
            inIt(td.data,fn,td.args)
        }
    })
}

function inIt(list,fn,args){
    //console.log(list);
    for(var i=0; i<list.length; i++){
        (function(i){
            fn(list[i],args)
        })(i)
    }
}

var fncn = new Nzh(require("../src/langs/cn_s"));
inTest(toCN,function(data,opts){
    //console.log(data);
    it(data.join(" | "),function(){
        fncn.encode(data[0],opts).should.equal(data[1]);
        fncn.decode(data[1]).should.equal((+data[0]).toString());
    })
})

var fncnb = new Nzh(require("../src/langs/cn_b"));

inTest(toMoney,function(data,opts){
    //console.log(data);
    it(data.join(" | "),function(){
        fncnb.toMoney(data[0],opts).should.equal(data[1]);
    })
})

describe(custom.name,function(){
    var customClass = new Nzh(custom.lang);
    inTest(custom.testCL,function(data,opts){
        it(data.join(" | "),function(){
            customClass.encode(data[0],opts).should.equal(data[1]);
            customClass.decode(data[1]).should.equal((+data[0]).toString());
        })
    })
    inTest(custom.testMoney,function(data,opts){
        //console.log(data);
        it(data.join(" | "),function(){
            customClass.toMoney(data[0],opts).should.equal(data[1]);
        })
    })
})