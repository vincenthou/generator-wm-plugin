define [
  'wm/app'
  'wm/config'
  'jquery'
], (app, config) ->
  app.registerController 'wm.ctrl.<%= moduleName %>.index', [
    'restService'
    (restService) ->
      vm = this

      restService.get config.resources.index, (data) ->
        vm.text = data

      vm
  ]
