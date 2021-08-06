const store = new Vuex.Store({
    state: {
      statusJuego : 0,
      jugadores : [] 
    },
    mutations: {
      agregarJugador(state,jugador){
          state.jugadores.push({
            'numeroJugador' : jugador.numero , 
            'nombreJugador' : jugador.nombre,
            'colorJugador' : jugador.color,
            'posicionActual' : 0
          });
         // console.log('Se agrego un nuevo jugador');
         // console.log(state.jugadores);
      },
      iniciarJuego(state){
        state.statusJuego  = 1 
      },
      moverJugador(state,jugador){
        jugadorEntrada = state.jugadores[jugador.numero-1] ; 
        console.log("llegue aqui =?");
        console.log(jugadorEntrada) ; 
      }
    }
});


 const app=new Vue({
    data: {
      tablero: [],
      TIPO_ESCALERA : 0, 
      TIPO_SERPIENTE :  1 ,
      TIPO_NORMAL : 2 , 
      limiteTablero : 100 ,
      opcionJugadores : [1,2,3,4],
      numeroJugadores:  0 ,
      dialog : false 
    },
    el: '#aplicacion',
    vuetify: new Vuetify(),
    store : store,
    beforeMount(){
        console.log('compilo esta vaina?')
        this.generarTablero(5,5,100);
	},
    methods:{
      cerrar: function(event){
        document.getElementById("tvesModal").style.display = "none";
      },
      generarTablero : function(totalEscaleras,totalSerpientes,numeroCasillas){
        var contadorEscaleras = 0 ; 
        var contadorSerpientes  = 0 ; 
        for(var iterador = 0 ; iterador < numeroCasillas ; iterador++){
            var tipoGenerar = this.getNumeroRandom();
            if(iterador > 16){
              if(tipoGenerar == this.TIPO_ESCALERA && contadorEscaleras < totalEscaleras){
                let casilla = this.generaCasilla(iterador,tipoGenerar);
                this.tablero.push(casilla);
                contadorEscaleras++; 
              }else if(tipoGenerar == this.TIPO_SERPIENTE && contadorSerpientes < totalSerpientes && iterador > 15){
                  let casilla = this.generaCasilla(iterador,tipoGenerar);
                  this.tablero.push(casilla);
                  contadorSerpientes++; 
              }else{
                  let casilla = this.generaCasilla(iterador,this.TIPO_NORMAL);
                  this.tablero.push(casilla);
              }
            }else{
              let casilla = this.generaCasilla(iterador,this.TIPO_NORMAL);
              this.tablero.push(casilla);
            }
            
        }
        console.log(contadorEscaleras + ' ' + contadorSerpientes)
        console.log(this.tablero); 
      },

      getNumeroRandom : function(){
        var aleatorio = Math.random() ;
        if(aleatorio > .7 && aleatorio < .85){
          return this.TIPO_SERPIENTE
        }else if(aleatorio >= .85){
          return this.TIPO_ESCALERA
        }else{
          return this.TIPO_NORMAL
        } 
      },

      getNumeroRandomEntre : function(inicio,limite){
        return Math.floor(Math.random() * limite) + inicio;
      },

      generaCasilla : function(numeroCasilla,tipoCasilla){ 
        var sube = 0 ; 
        var baja = 0 ; 
        if(tipoCasilla == this.TIPO_ESCALERA){
            if(numeroCasilla < 50){}
            sube = this.getNumeroRandomEntre(numeroCasilla,this.limiteTablero);
        }else if(tipoCasilla == this.TIPO_SERPIENTE){
            baja = this.getNumeroRandomEntre(0,numeroCasilla);
        }
        return {
            'numeroCasilla' : numeroCasilla + 1,
            'sube' : sube,
            'baja' : baja
        };
      },

      iniciarJuego : function(){
        if(this.numeroJugadores > 0) {
          for(var iterador = 0 ; iterador < this.numeroJugadores ; iterador++){
            store.commit('agregarJugador',{
              'numero' : (iterador + 1),
              'color' : 'green',
              'nombre' : 'Jugador ' + (iterador+1)
            });
          }
          store.commit('iniciarJuego');
          store.commit('moverJugador',{
            'numero' : 1 
          });
        }else{
          this.dialog = true ;
        }
        
      },

      moverJugador : function(indiceJugador,cantidadMover){
        store.commit('moverJugador',{
          'numero' : 1 
        });
      },
    }
  });