(function(){
  angular.module('app').component('paginator', {
    bindings: {
      url: '@',
      pages: '@',
    },
    controller: [
      '$location',
      function($location) {
        this.$onInit = function() {
          const pages = parseInt(this.pages) || 1
          this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1)//vou criar um array do tamanho de pages e percorrer ele todo sempre colocando indice + 1, assim meu array vai ficar sequencial

          //vou pegar o elemento corrente
          this.current = parseInt($location.search().page) || 1
          //só renderizo o paginador se houver necessidade, ou seja, se houver mais de uma página para ser exibida
          this.needPagination = this.pages > 1
          //só preciso ter o botão 'Anterior', se a página corrente for maior que a primeira
          this.hasPrevious = this.current > 1
          //só preciso ter o botão 'Próximo', se a página corrente não for a última
          this.hasNext = this.current < this.pages

          //função para verificar se o elemento atual é o corrente
          this.isCurrent = (i) => {
            return this.current == i
          }
        }
      }
    ],
    template: `
    <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
      <li ng-if="$ctrl.hasPrevious">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1 }}">Anterior</a>
      </li>

      <li ng-repeat="index in $ctrl.pagesArray" ng-class="{active: $ctrl.isCurrent(index)}">
        <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
      </li>

      <li ng-if="$ctrl.hasNext">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">Próximo</a>
      </li>
    </ul>
    `
  })
})()
