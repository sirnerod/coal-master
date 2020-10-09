## CHALLENGE DOC:

**REPOSITORY:** https://gitlab.com/simpr-cebu/coal.git

**TEST URL:** https://dev-env.app/series

1. Can return “Electric power carbon dioxide emission quantity from some state from
some year”.
a. For example: given params of year:2000, state:California. It should return 2.103701

 
 **API END-POINT:** https://dev-env.app/series/emission/< state >/< year >

 **EXAMPLE:** https://dev-env.app/series/emission/California/2000

------------------------------------------------------------------------------------------------
2. If for each million metric tons of “Electric power carbon dioxide emission” from coal
consumed, the state government need to pay tax of 1 million dollars. Please create an
API that with params of from, to, state, that returns the total tax that the state
government paid in that period.
a. For example: given from: 2003, to:2006, state: California. It should return
8.306344million or 8.3 million

 **API END-POINT:** https://dev-env.app/series/tax/< state >/< from >/< to >
 
 **EXAMPLE:** https://dev-env.app/series/tax/California/2003/2006

--------------------------------------------------------------------------------------------
3. (Bonus) Please create a NOSQL MongoDB in any cloud. To save at least 5 set data from
child series on this page: https://www.eia.gov/opendata/qb.php?category=2251609
And add another end point that can return the state that has the highest CO2 emission
in a given period (from, to will be given as params)

Saving: request post url to "https://dev-env.app/series" with post body of the following format:

    {
          "series_id": "",
          "name": "",
          "units": "",
          "f": "",
          "unitsshort": "",
          "description": "",
          "copyright": "",
          "source": "",
          "iso3166": "",
          "geography": "",
          "start": "",
          "end": "",
          "updated": "",
          "data": [
            [
              < YEAR >,
              < Emission value >
            ]
          ]
        }

Fetching for highest CO2 Emission state: request get url to "https://dev-env.app/series/highest_emission_state/< from >/< to >"
Example: https://dev-env.app/series/highest_emission_state/2009/2010
