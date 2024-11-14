import React from 'react'
import '../Grafik/Timeseries.css';
import {AreaChart, linearGradient, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer} from 'recharts'
function Timeseries(){
  const data=[
    {
      "year": "2012",
      "Legenda 1": 4000,
      "Legenda 2": 2400,
      "Legenda 3": 2400
    },
    {
      "year": "2013",
      "Legenda 1": 3000,
      "Legenda 2": 1398,
      "Legenda 3": 2210
    },
    {
      "year": "2014",
      "Legenda 1": 2000,
      "Legenda 2": 9800,
      "Legenda 3": 2290
    },
    {
      "year": "2015",
      "Legenda 1": 2780,
      "Legenda 2": 3908,
      "Legenda 3": 2000
    },
    {
      "year": "2016",
      "Legenda 1": 1890,
      "Legenda 2": 4800,
      "Legenda 3": 2181
    },
    {
      "year": "2017",
      "Legenda 1": 2390,
      "Legenda 2": 3800,
      "Legenda 3": 2500
    },
    {
      "year": "2018",
      "Legenda 1": 3490,
      "Legenda 2": 4300,
      "Legenda 3": 2100
    },
    {
      "year": "2019",
      "Legenda 1": 3530,
      "Legenda 2": 4300,
      "Legenda 3": 2100
    },
    {
      "year": "2020",
      "Legenda 1": 5490,
      "Legenda 2": 4120,
      "Legenda 3": 4122
    },
    {
      "year": "2021",
      "Legenda 1": 1234,
      "Legenda 2": 4333,
      "Legenda 3": 3123
    },
    {
      "year": "2022",
      "Legenda 1": 1234,
      "Legenda 2": 4412,
      "Legenda 3": 2112
    },
    {
      "year": "2023",
      "Legenda 1": 3210,
      "Legenda 2": 4312,
      "Legenda 3": 1233
    },
  ]
  return (
    <section className='w-full'>
        <div className='flex bg-white w-[450px] h-[450px] text-secondary rounded-[25px] grappp'>
          <div className='w-full h-[320px] mt-[90px] mx-[20px] overflow-y-auto mini-scrollbar'>
            <AreaChart data={data}
              width={700} height={300}
              margin={{ top: 5, right: 40, left: 0, bottom: 5 }} >
              <defs>
                <linearGradient id="colorLegenda1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94DEFF" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#94DEFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLegenda2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#41B8D5" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#41B8D5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLegenda3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#31356E" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#31356E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{fontSize: 12}} 
              />
              <YAxis tick={{fontSize: 12}}/>
              <CartesianGrid strokeDasharray="0" horizontalCoordinatesGenerator={(props) => props.width = 150} />
              <Tooltip />
                <Area type="monotone" dataKey="Legenda 1" stroke="#94DEFF" fillOpacity={1} fill="url(#colorLegenda1)" layout='vertical' dot={{r: 3}}/>
                <Area type="monotone" dataKey="Legenda 2" stroke="#41B8D5" fillOpacity={1} fill="url(#colorLegenda2)" layout='vertical' dot={{r: 3}}/>
                <Area type="monotone" dataKey="Legenda 3" stroke="#31356E" fillOpacity={1} fill="url(#colorLegenda3)" layout='vertical' dot={{r: 3}}/>
              <Legend iconType='circle' layout='vertical'  iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
            </AreaChart>
          </div>
        </div>
    </section>
  )
}

export default Timeseries;