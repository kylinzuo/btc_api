const config = async (ctx, next) => {
  ctx.response.body = {
    exchanges: [{
      desc: "",
      name: "All Exchanges",
      value: ''
    }, {
      desc: "NasdaqNM",
      name: "NasdaqNM",
      value: 'NasdaqNM'
    }, {
      desc: "NYSE",
      name: "NYSE",
      value: 'NYSE'
    }, {
      desc: "NCM",
      name: "NCM",
      value: 'NCM'
    }, {
      desc: "NGM",
      name: "NGM",
      value: 'NGM'
    }],
    supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
    supports_group_request: false,
    supports_marks: true,
    supports_search: true,
    supports_time: true,
    supports_timescale_marks: true,
    symbols_types: [{
      name: "All types",
      value: ""
    }, {
      name: "Stock",
      value: "stock"
    }, {
      name: "Index",
      value: "index"
    }]
  }
}

let symbols = async (ctx, next) => {
  ctx.response.body = {
    "name": "AAPL",
    "exchange-traded": "NasdaqNM",
    "exchange-listed": "NasdaqNM",
    "timezone": "America/New_York",
    "minmov": 1,
    "minmov2": 0,
    "pointvalue": 1,
    "session": "0930-1630",
    "has_intraday": false,
    "has_no_volume": false,
    "description": "Apple Inc.",
    "type": "stock",
    "supported_resolutions": ["D", "2D", "3D", "W", "3W", "M", "6M"],
    "pricescale": 100,
    "ticker": "AAPL"
  }
}

let history = async (ctx, next) => {
  ctx.response.body = 1
}

module.exports = {
  'GET /config': config,
  'GET /symbols': symbols,
  'GET /history': history
}
