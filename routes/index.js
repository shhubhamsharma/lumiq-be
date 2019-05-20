var express = require('express');
var router = express.Router();

let letters_keys = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
}

let superHeroList =["SUPERMAN", "THOR", "ROBIN", "IRONMAN", "GHOSTRIDER", 
"CAPTAINAMERICA", "FLASH",
  "WOLVERINE",
  "BATMAN", "HULK", "BLADE", "PHANTOM", "SPIDERMAN", "BLACKWIDOW", "HELLBOY", "PUNISHER"];
function all_possable(num) {
  return num.split('').map(x => new Set(letters_keys[x]))
}

router.post('/callSuperHero', function(req, res, next) {
  var possable = all_possable(req.body.code)
  possable = possable.map(x => [...x])

  let v = possable.reduceRight((x, a) => {

    if (x.length === 0) {
      x = a
    } else {

     let k = x.map(c => a.map(b => b + c))
      x = k.reduce((acc, a) => acc.concat(a), [])
    }
    return x;
  }, [])

  return res.send(v.sort().filter(value => superHeroList.includes(value.toUpperCase())));
});

module.exports = router;
