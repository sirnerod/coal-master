const express = require('express');
const router = express.Router();
const Series = require('../models/Series');
const _ = require('lodash');
const fetch = require('node-fetch');


router.get('/emission/:states/:year', (req,res)=>{
    fetch(process.env.EIA_CATEGORY)
    .then(response=>{
        response.json().then(result=>{
             let filtered = _.filter(result.category.childseries, 
                series => series.name.split(', ')[2] == req.params.states)

             _.each(filtered, f=>{
                fetch(process.env.EIA_SERIES+f.series_id)
                .then(r=>{
                    r.json().then(data=>{
                        data.series[0].data.forEach((v,i)=>{
                            if (v[0] == req.params.year) {
                                res.json(v[1])
                            }
                        })
                    })
                })
             })
        })
    })
    .catch(e=>{
        res.send(e)
    })
});

router.get('/tax/:states/:from/:to', (req,res)=>{
    fetch(process.env.EIA_CATEGORY)
    .then(response=>{
        response.json().then(result=>{
             let filtered = _.filter(result.category.childseries, 
                series => series.name.split(', ')[2] == req.params.states)

             _.each(filtered, f=>{
                fetch(process.env.EIA_SERIES+f.series_id)
                .then(r=>{
                    r.json().then(data=>{
                        let sum = 0;
                        data.series[0].data.forEach((v,i)=>{
                            if (v[0] >= req.params.from && v[0] <= req.params.to) {
                                sum += v[1]
                            }
                        })
                        res.json(sum);
                    })
                })
             })
        })
    })
    .catch(e=>{
        res.send(e)
    })
});

router.get('/', (req,res)=>{
    Series.find()
    .then(result=>{
        _.each(result, item=>{

        })
        res.json(result);
    })
    .catch(e=>{
        res.json({message: e});
    });
});

router.get('/highest_emission_state/:from/:to', (req,res)=>{
    Series.find()
    .then(result=>{
        let filtred = _.map(result, item=>{
            let top = 0
            _.each(item.data, v => {
                if (v[0] >= req.params.from && v[0] <= req.params.to && top.tax < v[1])
                    top.tax = v[1]
            })

            return {
                name : item.name,
                top: top
            }
        })
        let winner = _.maxBy(filtred, f=>f.top)
        res.json(winner.name.split(', ')[2]);
    })
    .catch(e=>{
        res.json({message: e});
    });
});

router.post('/', (req,res)=>{
    let data = req.body;
    const series = new Series({
        series_id: data.series_id,
        name: data.name,
        units: data.units,
        f: data.f,
        unitsshort: data.unitsshort,
        description: data.description,
        copyright: data.copyright,
        source: data.source,
        iso3166: data.iso3166,
        geography: data.geography,
        start: data.start,
        end: data.end,
        data: data.data
    });
    series.save()
    .then(result=>{
        res.json(result);
    })
    .catch(e=>{
        res.json({message: e});
    });
});

router.get('/:sid', (req,res)=>{
    Series.findById(req.params.sid)
    .then(result=>{
        res.json(result);
    })
    .catch(e=>{
        res.json({message: e});
    });
});

router.delete('/:sid', (req,res)=>{
    Series.remove({_id: req.params.sid})
    .then(result=>{
        res.json(result);
    })
    .catch(e=>{
        res.json({message: e});
    });
});

router.patch('/:sid', (req,res)=>{
    Series.updateOne({_id: req.params.sid},{$set: {name: req.body.title}})
    .then(result=>{
        res.json(result);
    })
    .catch(e=>{
        res.json({message: e});
    });
});
module.exports = router;
