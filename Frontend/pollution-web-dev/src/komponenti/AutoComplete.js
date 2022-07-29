import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'




const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

const initialState = { isLoading: false, results: [], value: '' }

export default class AutoCompleteText extends Component {
    state = initialState;

    pushURL=(lat,lng)=>{
        let s = '/' + lat.toFixed(4) + '/' + lng.toFixed(4)+'/details';
        window.history.pushState({"html": "", "pageTitle": ""}, "", s);
        window.location.replace(s);
    }

    handleResultSelect = (e, { result }) => this.pushURL(result.lat,result.lng)

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

   onSearchClickHandler = () =>{
        let oddValues=[]
        for (let i in source){
            if( i%2 !== 0 ){
                oddValues.push(source[i])
            }
        }
        this.setState({
            results:oddValues
        })
    }

    render() {
        const { isLoading, value, results } = this.state



        return (

            <Search
                placeholder={"Пронајди локација:"}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                {...this.props}
                minCharacters={0}
                onClick={this.onSearchClickHandler}
            />

        )
    }
}


const source =[
    {
        title: "Aerodrom",
        lat: 41.985796,
        lng: 21.466245,

    },
    {
        title: "Аеродром",
        lat: 41.985796,
        lng: 21.466245,

    },
    {
        title: "Kisela Voda",
        lat: 41.979424,
        lng: 21.442537,

    },
    {
        title: "Кисела Вода",
        lat: 41.979424,
        lng: 21.442537,

    },
    {
        title: "Novo Lisiche",
        lat: 41.984390,
        lng: 21.476563,

    },
    {
        title: "Ново Лисиче",
        lat: 41.984390,
        lng: 21.476563,

    },
    {
        title: "Centar",
        lat: 41.996017,
        lng: 21.431912,

    },
    {
        title: "Центар",
        lat: 41.996017,
        lng: 21.431912,

    },
    {
        title: "Karposh",
        lat: 42.001638,
        lng: 21.397008,

    },
    {
        title: "Карпош",
        lat: 42.001638,
        lng: 21.397008,

    },
    {
        title: "Gjorche Petrov",
        lat: 42.006905,
        lng: 21.352042,

    },
    {
        title: "Ѓорче Петров",
        lat: 42.006905,
        lng: 21.352042,

    },
    {
        title: "Saraj",
        lat: 41.995137,
        lng: 21.248611,

    },
    {
        title: "Сарај",
        lat: 41.995137,
        lng: 21.248611,

    },
    {
        title: "Chair",
        lat: 42.013391,
        lng: 21.444487,

    },
    {
        title: "Чаир",
        lat: 42.013391,
        lng: 21.444487,

    },
    {
        title: "Butel",
        lat: 42.031024,
        lng: 21.446324,

    },
    {
        title: "Бутел",
        lat: 42.031024,
        lng: 21.446324,

    },
    {
        title: "Radishani",
        lat: 42.061486,
        lng: 21.451677,

    },
    {
        title: "Радишани",
        lat: 42.061486,
        lng: 21.451677,

    },
    {
        title: "Shuto Orizari",
        lat: 42.039261,
        lng: 21.425303,

    },
    {
        title: "Шуто Оризари",
        lat: 42.039261,
        lng: 21.425303,

    },
    {
        title: "Drachevo",
        lat: 41.939068,
        lng: 21.520799,

    },
    {
        title: "Драчево",
        lat: 41.939068,
        lng: 21.520799,

    },
    {
        title: "Arachinovo",
        lat: 42.025041,
        lng: 21.563963,

    },
    {
        title: "Арачиново",
        lat: 42.025041,
        lng: 21.563963,

    },
    {
        title: "Ilinden",
        lat: 41.995601,
        lng: 21.571903,

    },
    {
        title: "Илинден",
        lat: 41.995601,
        lng: 21.571903,

    },
    {
        title: "Gazi Baba",
        lat: 42.012448,
        lng: 21.459916,

    },
    {
        title: "Гази Баба",
        lat: 42.012448,
        lng: 21.459916,

    },
    {
        title: "Bitola",
        lat: 41.029491,
        lng: 21.332481,

    },
    {
        title: "Битола",
        lat: 41.029491,
        lng: 21.332481,

    },
    {
        title: "Berovo",
        lat: 41.705759,
        lng: 22.854574,

    },
    {
        title: "Берово",
        lat: 41.705759,
        lng: 22.854574,

    },
    {
        title: "Debar",
        lat: 41.522532,
        lng: 20.525827,

    },
    {
        title: "Дебар",
        lat: 41.522532,
        lng: 20.525827,

    },
    {
        title: "Delchevo",
        lat: 41.967415,
        lng: 22.773498,

    },
    {
        title: "Делчево",
        lat: 41.967415,
        lng: 22.773498,

    },
    {
        title: "Demir Hisar",
        lat: 41.220608,
        lng: 21.202996,

    },
    {
        title: "Демир Хисар",
        lat: 41.220608,
        lng: 21.202996,

    },
    {
        title: "Demir Kapija",
        lat: 41.220608,
        lng: 22.243365,

    },
    {
        title: "Демир Капија",
        lat: 41.220608,
        lng: 22.243365,

    },



    {
        title: "Gevgelija",
        lat: 41.142886,
        lng: 22.501711,

    },
    {
        title: "Гевгелија",
        lat: 41.142886,
        lng: 22.501711,

    },
    {
        title: "Gostivar",
        lat: 41.796328,
        lng: 20.913000,

    },
    {
        title: "Гостивар",
        lat: 41.796328,
        lng: 20.913000,

    },
    {
        title: "Kavadarci",
        lat: 41.433324,
        lng: 22.012609,

    },
    {
        title: "Кавадарци",
        lat: 41.433324,
        lng: 22.012609,

    },
    {
        title: "Kichevo",
        lat: 41.514182,
        lng: 20.958642,

    },
    {
        title: "Кичево",
        lat: 41.514182,
        lng: 20.958642,

    },
    {
        title: "Kochani",
        lat: 41.918202,
        lng: 22.411659,

    },
    {
        title: "Кочани",
        lat: 41.918202,
        lng: 22.411659,

    },
    {
        title: "Kratovo",
        lat: 42.079900,
        lng: 22.177386,

    },
    {
        title: "Кратово",
        lat: 42.079900,
        lng: 22.177386,

    },
    {
        title: "Kriva Palanka",
        lat: 42.203240,
        lng: 22.333654,

    },
    {
        title: "Крива Паланка",
        lat: 42.203240,
        lng: 22.333654,

    },
    {
        title: "Krushevo",
        lat: 41.369997,
        lng: 21.248814,

    },
    {
        title: "Крушево",
        lat: 41.369997,
        lng: 21.248814,

    },
    {
        title: "Kumanovo",
        lat: 42.134702,
        lng: 21.718708,

    },
    {
        title: "Куманово",
        lat: 42.134702,
        lng: 21.718708,

    },

    {
        title: "Makedonska Kamenica",
        lat: 42.021026,
        lng: 22.588042,

    },
    {
        title: "Македонска Каменица",
        lat: 42.021026,
        lng: 22.588042,

    },
    {
        title: "Makedonski Brod",
        lat: 41.512355,
        lng: 21.216477,

    },
    {
        title: "Македонски Брод",
        lat: 41.512355,
        lng: 21.216477,

    },
    {
        title: "Negotino",
        lat: 41.483190,
        lng: 22.091830,

    },
    {
        title: "Неготино",
        lat: 41.483190,
        lng: 22.091830,

    },
    {
        title: "Ohrid",
        lat: 41.112971,
        lng: 20.800376,

    },
    {
        title: "Охрид",
        lat: 41.112971,
        lng: 20.800376,

    },
    {
        title: "Pehchevo",
        lat: 41.762523,
        lng: 22.887566,

    },
    {
        title: "Пехчево",
        lat: 41.762523,
        lng: 22.887566,

    },
    {
        title: "Prilep",
        lat: 41.346074,
        lng: 21.553592,

    },
    {
        title: "Прилеп",
        lat: 41.346074,
        lng: 21.553592,

    },
    {
        title: "Probishtip",
        lat: 41.996689,
        lng: 22.184791,

    },
    {
        title: "Пробиштип",
        lat: 41.996689,
        lng: 22.184791,

    },

    {
        title: "Resen",
        lat: 41.089628,
        lng: 21.013337,

    },
    {
        title: "Ресен",
        lat: 41.089628,
        lng: 21.013337,

    },
    {
        title: "Shtip",
        lat: 41.741851,
        lng: 22.199179,

    },
    {
        title: "Штип",
        lat: 41.741851,
        lng: 22.199179,

    },
    {
        title: "Struga",
        lat: 41.177781,
        lng: 20.678494,

    },
    {
        title: "Струга",
        lat: 41.177781,
        lng: 20.678494,

    },
    {
        title: "Strumica",
        lat: 41.437600,
        lng: 22.642890,

    },
    {
        title: "Струмица",
        lat: 41.437600,
        lng: 22.642890,

    },

    {
        title: "Sveti Nikole",
        lat: 41.865170,
        lng: 21.940711,

    },
    {
        title: "Свети Николе",
        lat: 41.865170,
        lng: 21.940711,

    },
    {
        title: "Tetovo",
        lat: 42.007929,
        lng: 20.969445,

    },
    {
        title: "Тетово",
        lat: 42.007929,
        lng: 20.969445,

    },
    {
        title: "Valandovo",
        lat: 41.317625,
        lng: 22.560747,

    },
    {
        title: "Валандово",
        lat: 41.317625,
        lng: 22.560747,

    },
    {
        title: "Veles",
        lat: 41.715320,
        lng: 21.771945,

    },
    {
        title: "Велес",
        lat: 41.715320,
        lng: 21.771945,

    },
    {
        title: "Vevchani",
        lat: 41.240787,
        lng: 20.591865,

    },
    {
        title: "Вевчани",
        lat: 41.240787,
        lng: 20.591865,

    },
    {
        title: "Vinica",
        lat: 41.882423,
        lng: 22.508594,

    },
    {
        title: "Виница",
        lat: 41.882423,
        lng: 22.508594,

    },
    {
        title: "Dojran",
        lat: 41.218407,
        lng: 22.704459,

    },
    {
        title: "Дојран",
        lat: 41.218407,
        lng: 22.704459,

    },
    {
        title: "Bogdanci",
        lat: 41.203609,
        lng: 22.576217,

    },
    {
        title: "Богданци",
        lat: 41.203609,
        lng: 22.576217,

    }

];
