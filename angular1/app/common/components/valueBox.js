(function(){
  angular.module('app').component('valueBox', {
    bindings: {
      grid: '@',
      colorClass: '@',
      value: '@',
      text: '@',
      iconClass: '@'
    },
    controller: [
      'gridSystem', //injeção de dependência
      function (gridSystem) {
        //esse this.$onInit garante que essa função abaixo só será executada depois que o bindings for executado, assim não temos erro de formatação
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    template : `
    <div class="{{ $ctrl.gridClasses }}">
      <div class="small-box {{ $ctrl.colorClass }}">
        <div class="inner">
          <h3>{{ $ctrl.value }}</h3>
          <p>{{ $ctrl.text }}</p>
        </div>
        <div class="icon">
          <i class="fa {{ $ctrl.iconClass }}"></i>
        </div>
      </div>
    </div>
    `
  })
})()
