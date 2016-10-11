<script src="bower_components/toggles/lib/toggles.js"></script>

host from command line:
function showHost(e) {console.log(angular.element(e).injector().get('$location').host())}
showHost(document.body)
