/**
 * Created by zhalex on 17.03.2016.
 */
$(document).ready(function() {

var limit=12, pokesList = [], offset= 0, possibleTypes=[], cachetypes=[], maxInfoSize= $( window ).height();
    function Pokemon(name, type, id, attack, defense, hp, spAttack, spDefense, speed, weight, totalMoves) {
        this.name = name;
        this.types = type;
        this.id = id;
        this.imgUrl = /*"http://pokeapi.co/media/img/"+this.id+".png" ||*/ "http://placehold.it/150x150";
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
        this.weight = weight;
        this.totalMoves = totalMoves;
    }
    function CheckTypes(type){
        switch (type) {
            case "bug":
                cachetypes = "background-color: #A8B820";
                break;
            case "dark":
                cachetypes = "background-color: #2C2E2B";
                break;
            case "dragon":
                cachetypes = "background-color: #7038F8";
                break;
            case "electric":
                cachetypes ="background-color: #7038F8" ;
                break;
            case "fairy":
                cachetypes = "background-color: #EE99AC";
                break;
            case "fighting":
                cachetypes = "background-color: #C03028";
                break;
            case "fire":
                cachetypes = "background-color: #F08030";
                break;
            case "flying":
                cachetypes = "background-color: #A890F0";
                break;
            case "ghost":
                cachetypes = "background-color: #705898";
                break;
            case "grass":
                cachetypes = "background-color: #7DB808";
                break;
            case "ground":
                cachetypes = "background-color: #E0C068";
                break;
            case "ice":
                cachetypes = "background-color: #98D8D8";
                break;
            case "normal":
                cachetypes = "background-color: #A8A878";
                break;
            case "poison":
                cachetypes = "background-color: #A040A0";
                break;
            case "psychic":
                cachetypes = "background-color: #A65E9A";
                break;
            case "rock":
                cachetypes = "background-color: #B8A038";
                break;
            case "steel":
                cachetypes = "background-color: #B8A038";
                break;
            case "water":
                cachetypes = "background-color: #6890F0";
                break;
            default:
                cachetypes ="background-color: none" ;
                break;
        }
        return cachetypes;
    }

    function GetQuery(limit) {
        $.ajax({
            url: "https://pokeapi.co/api/v1/pokemon/?limit="+limit+"&offset="+offset,
            type: "GET",
            dataType: "json",
            async: true,
            cache:true,
            beforeSend: function(){
                $("#loadBut").text("Please Wait...");
            },
            success: function (data) {
                console.log(data);
                $("#loadBut").text("Load more");
                offset+=12;
                pokesList =[];
                for (var i = 0; i < limit; i++) {
                    pokesList.push( new Pokemon(data.objects[i].name,
                        data.objects[i].types.map(function(item){return item.name}),
                        data.objects[i].pkdx_id,
                        data.objects[i].attack,
                        data.objects[i].defense,
                        data.objects[i].hp,
                        data.objects[i].sp_atk,
                        data.objects[i].sp_def,
                        data.objects[i].speed,
                        data.objects[i].weight,
                        data.objects[i].moves));
                }
                buildInfo(pokesList);

                for(var j = 0; j<possibleTypes.length;j++){
                    $("<div>",{
                        text: possibleTypes[j],
                        style: CheckTypes( possibleTypes[j]),
                        class:"typesDives"
                    }).appendTo("#types").css("display","inline-block");
                }


                $("#allTypes").text("Show all "+$(".pokesinfo").length+" pokemones")


            },
            error: function(){
                $("#loadBut").text("Try again");
            },
             complete:function() {
                window.scrollTo(0, document.body.scrollHeight);
            }

        })
    }
    function buildInfo(obj) {
                for (var j = 0; j < obj.length; j++) {
                    $("<div>", {
                        id:obj[j].id,
                        class: "col-lg-3 col-md-4 col-sm-4 col-xs-12 well pokesinfo"
                    }).appendTo("#content").html(   "<div class='text-center pokemonsName'>"+obj[j].name+"</div>"+
                                                    "<img src="+obj[j].imgUrl+" id="+"img"+obj[j].id+" class='img-responsive'>"
                                                );
                    for(var k=0; k<obj[j].types.length; k++){
                        CheckTypes(obj[j].types[k]);
                        possibleTypes.push(obj[j].types);
                        possibleTypes = possibleTypes.toString().split(",").sort().reduce(function(arr, el){
                            if(!arr.length || arr.length && arr[arr.length - 1] != el) {
                                arr.push(el);
                            }
                            return arr;
                        }, []);
                        $("<div>",{
                            text: obj[j].types[k],
                            style: cachetypes,
                            class:"typesDives"
                        }).insertAfter("#img"+obj[j].id);
                    }
                }

        $('div .pokesinfo').on("click",function() {
            var currentId = $(this).attr("id");
            var selectedPokemon = obj.filter(function(data){
                return data.id == parseInt(currentId);
            });
            $("#infodiv").html(
                "<img src=" + selectedPokemon[0].imgUrl + " class='img-responsive'>"+
                "<h4  class='text-center'>#"+selectedPokemon[0].id+" "+selectedPokemon[0].name+"</h4>"+
                "<table class='table table-hover'><tbody>" +
                    "<tr><td>Type</td><td>"+selectedPokemon[0].types+"</td></tr>" +
                    "<tr><td>Attack</td><td>"+selectedPokemon[0].attack+"</td></tr>" +
                    "<tr><td>Defence</td><td>"+selectedPokemon[0].defense+"</td></tr>" +
                    "<tr><td>HP</td><td>"+selectedPokemon[0].hp+"</td></tr>" +
                    "<tr><td>SP Attack</td><td>"+selectedPokemon[0].spAttack+"</td></tr>" +
                    "<tr><td>SP Defence</td><td>" +selectedPokemon[0].spDefense+"</td></tr>" +
                    "<tr><td>Speed</td><td>"+selectedPokemon[0].speed+"</td></tr>" +
                    "<tr><td>Weight</td><td>"+selectedPokemon[0].weight+"</td></tr>" +
                    "<tr><td>Total moves</td><td>"+selectedPokemon[0].totalMoves.length+"</td></tr>" +
                "</tbody></table>"
            );
        });
    }
    $("#search-box").keyup(function(){
        var searchVal = $("#search-box").val().toLowerCase();
        $("div .pokemonsName").each(function(){
            for(var i=0; i<searchVal.length; i++){
                if($(this).text().toLowerCase().indexOf(searchVal)){
                    $(this).parent().fadeOut();
                }
            }
        });
        if(searchVal.trim().length===0){
            $("div .pokesinfo").fadeIn();
        }
    });

    $('#types').on("click",".typesDives",function(){
        var cache=[];
        var temp = $(this).text();
        $(".pokesinfo .typesDives").each(function(){
            if(temp.indexOf($(this).text())!==-1) {
                cache.push($(this).parent().attr("id"));
            }
            else{
                $(this).parent().fadeOut();
            }
        });
        for(var i =0; i<cache.length; i++){
            $("#"+cache[i]).fadeIn();
        }
    });

    $("#allTypes").click(function(){
        $(".pokesinfo").css({'display':'block'});
    });

    $('#loadBut').click(function() {
        $("#types").html("");
        GetQuery(limit);
    });

    $("#top").click(function(){
        window.scrollTo(0, 0);
    });

    $(function() {
        var $affixElement = $('div[data-spy="affix"]');
        $affixElement.width($affixElement.parent().width());
    });
    GetQuery(limit);
});