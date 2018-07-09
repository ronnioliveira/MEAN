(function(){
  angular.module('app').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=', //o sinal de = é necessário, pois o componente por padrão tem um escopo separado do controller e sem esse = o controller não conseguiria enxergar as alterações feitas no componente
      readonly: '<' //a alteração que for feita no componente não vai refletir no parent (controller)
    },
    controller: [
      'gridSystem',
      function(gridSystem){
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
      <div class="form-group">
        <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
        <input id="{{$ctrl.id}}" class="form-control" placeholder="{{$ctrl.placeholder}}"
        type="{{$ctrl.type}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly"/>
      </div>
    </div>
    `
  })
})()
