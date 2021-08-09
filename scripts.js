const store = new Vuex.Store({
    state: {
      statusJuego : 0,
      jugadores : [],
      consolaJuego :  []  
    },
    mutations: {
      agregarJugador(state,jugador){
          state.jugadores.push({
            'numeroJugador' : jugador.numero , 
            'nombreJugador' : jugador.nombre,
            'colorJugador' : jugador.color,
            'posicionActual' : 0,
            'turno' : 0 
          });
      },
      iniciarJuego(state){
        state.statusJuego  = 1 
        state.jugadores[0].turno = 1 
      },
      moverJugador(state,jugador){
        jugadorEntrada = state.jugadores[jugador.numero] ;  
        jugadorEntrada.posicionActual = jugadorEntrada.posicionActual + jugador.totalCasillasAvanza ; 
        jugadorEntrada.turno = 0 ; 
        state.jugadores[jugador.numero] = jugadorEntrada ;
        if(jugador.numero < state.jugadores.length - 1 ){
          state.jugadores[jugador.numero+1].turno = 1 ;
        }else{
          state.jugadores[0].turno = 1 ;
        }
      },
      subirBajarJugador(state, jugador){
        jugadorEntrada = state.jugadores[jugador.numero] ;  
        jugadorEntrada.posicionActual = jugador.nuevaPosicion ; 
      }
    },
    getters: {
      getJugador: (state) => (id) => {
        return state.jugadores.find(jugador => jugador.numeroJugador == id);
      },
      getAllJugadores : (state) => () =>{
        return state.jugadores ; 
      },
      getPosicionesJugadores : (state) => () =>{
        let arrayPosiciones = [] ;
        state.jugadores.forEach(function(jugador){
          if(jugador.posicionActual > 0 ){
            arrayPosiciones.push(jugador.posicionActual);
          }
        });
        return arrayPosiciones ; 
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
      dialog : false ,
      arrayEscaleras :  [],
      arraySerpientes :  [] ,
      arrayEscalerasDepurado :  [],
      arraySerpientesDepurado :  [] ,
      colores : ['#088A85','#DF0101','#0404B4','#F7FE2E']
    },
    el: '#aplicacion',
    vuetify: new Vuetify(),
    store : store,
    beforeMount(){
        this.generarTablero(5,5,100);
	},
    methods:{
      cerrar: function(event){
        document.getElementById("tvesModal").style.display = "none";
      },
      generarTablero : function(totalEscaleras,totalSerpientes,numeroCasillas){
        var indiceEscaleras = 0 ; 
        var indiceSerpientes  = 1 ;
        this.colores.sort(function() { return Math.random() - 0.5 }); 
        this.generarSerpientesyEscaleras();
        for(var iterador = 0 ; iterador < numeroCasillas ; iterador++){
            if(this.arrayEscalerasDepurado.includes(iterador)){
              let casilla = this.generaCasilla(iterador,this.TIPO_ESCALERA,indiceEscaleras);
              this.tablero.push(casilla);
              indiceEscaleras = indiceEscaleras + 2 ; 
            }else if (this.arraySerpientesDepurado.includes(iterador)){
              let casilla = this.generaCasilla(iterador,this.TIPO_SERPIENTE,indiceSerpientes);
              this.tablero.push(casilla);
              indiceSerpientes = indiceSerpientes + 2 ; 
            }
            else{
              let casilla = this.generaCasilla(iterador,this.TIPO_NORMAL,0);
              this.tablero.push(casilla);
            } 
        }
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

      generarSerpientesyEscaleras : function(){
          for(var iterador = 0 ; iterador < 10 ; iterador++){
            this.arrayEscaleras.push(this.getNumeroRandomEntre(1,100));
            this.arraySerpientes.push(this.getNumeroRandomEntre(1,100));
          }
          this.arrayEscaleras.sort(function(a, b) {
            return a - b;
          });
          this.arraySerpientes.sort(function(a, b) {
            return a - b;
          });
          for(var iterador = 1 ; iterador < 10 ; iterador = iterador + 2){
            this.arrayEscalerasDepurado.push(this.arrayEscaleras[iterador-1]);
            this.arraySerpientesDepurado.push(this.arraySerpientes[iterador]);
          }
      },

      getNumeroRandomEntre : function(inicio,limite){
        var numeroGenerado = Math.floor(Math.random() * limite) + inicio;
        while(this.arrayEscaleras.includes(numeroGenerado) || this.arraySerpientes.includes(numeroGenerado)){
          numeroGenerado = Math.floor(Math.random() * limite) + inicio;
        }
        return numeroGenerado ; 
      },

      getNumeroDados : function(inicio,limite){
        var numeroGenerado = Math.floor(Math.random() * limite) + inicio;
        return numeroGenerado ; 
      },


      generaCasilla : function(numeroCasilla,tipoCasilla,indice){ 
        var sube = 0 ; 
        var baja = 0 ; 
        if(tipoCasilla == this.TIPO_ESCALERA){
            sube = this.arrayEscaleras[indice+1];
        }else if(tipoCasilla == this.TIPO_SERPIENTE){
            baja = this.arraySerpientes[indice-1];
        }
        return {
            'numeroCasilla' : numeroCasilla + 1,
            'sube' : sube,
            'baja' : baja,
            'jugadoresDentro' : []
        };
      },

      iniciarJuego : function(){
        if(this.numeroJugadores > 0) {
          for(var iterador = 0 ; iterador < this.numeroJugadores ; iterador++){
            var color = this.colores[iterador];
            console.log(color)
            store.commit('agregarJugador',{
              'numero' : iterador,
              'color' : {
                height: '20px', 
                width: '30px' ,
                backgroundColor: color 
              },
              'nombre' : 'Jugador ' + (iterador+1),
              'posicionActual' : 0 ,
              'turno' : 0 
            });
          }
          store.commit('iniciarJuego');
          console.log(store.state.jugadores);
        }else{
          this.dialog = true ;
        }
        
      },



      tirar : function(jugador){
        var numeroAvanzar = this.getNumeroDados(1,7) ;
        store.commit('moverJugador',{
          'numero' : jugador.numeroJugador,
          'totalCasillasAvanza' : numeroAvanzar
        });
        jugador = store.getters.getJugador(jugador.numeroJugador);
        console.log(jugador)
        let casilla = this.getCasillaPorNumero(jugador.posicionActual);
        console.log(casilla)
        if(casilla.sube != 0 || casilla.baja != 0){
          store.commit('subirBajarJugador',{
            'numero' : jugador.numeroJugador,
            'nuevaPosicion' : (casilla.sube + casilla.baja)
          });
        }
        jugador = store.getters.getJugador(jugador.numeroJugador);
        console.log(jugador)
        this.tablero[jugador.posicionActual-1].jugadoresDentro.push(jugador);
        this.limpiarTablero();
        
      },

      getCasillaPorNumero : function(numeroCasilla){
        return this.tablero.find(casilla => casilla.numeroCasilla == numeroCasilla);
      },

      limpiarTablero : function(){
        let posicionesActuales = store.getters.getPosicionesJugadores();
        console.log(posicionesActuales);
        for(var iterador = 0 ; iterador < this.tablero.length ; iterador++){
          if(!posicionesActuales.includes(this.tablero[iterador].numeroCasilla)){
            this.tablero[iterador].jugadoresDentro =  [] ;
          }
        }   
      }
    }
  });