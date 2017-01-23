var fs=require("fs");
var util=require("util");

var IPList = [];

Regex = /\n((([01][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9])\.([01][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9])\.([01][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9]))\.([01][0-9][0-9]|2[0-4][0-9]|25[0-5]|[0-9][0-9]|[0-9]))/ig;

main();
function main() {
    var ip = [];
    var log = fs.readFileSync("access.log", 'utf8');
    var IP = log.match(Regex);
  
    
    for (i = 0; i < IP.length; i++)
    {
        var isPresent = false;
        for (j = 0; j < ip.length; j++)
        {
            if (ip[j] == IP[i]) {
                var isPresent = true;
            }
        }

        if (!isPresent) {
            ip.push(IP[i]);
        }
    }

    var subnets = {};
    for(i=0; i<ip.length; i++) {
        var ip1 = ip[i].substr(1, ip[i].length);
        var mask = ip1.split('.',3).join('.')

        if (!subnets[mask]) {
            subnets[mask] = {}
            subnets[mask].mask = mask;
            subnets[mask].ip = [];
            subnets[mask].ip.push(ip[i]);
        }
        else {
            subnets[mask].ip.push(ip[i]);
        }
    }

    
    for (var property in subnets) {
        if (subnets.hasOwnProperty(property)) {
            console.log("Mask: " + subnets[property].mask);
            for (j = 0; j < subnets[property].ip.length; j++) {
                console.log(subnets[property].ip[j]);
            }
          
        }
    }
   
}
