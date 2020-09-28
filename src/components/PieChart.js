import React, { useEffect, useState} from "react";
import Axios from "axios";
import {Container, Button} from "reactstrap";
import HighCharts from "highcharts"
import HighchartsReact from "highcharts-react-official"


const PieChart = ({userObj, signOut})=>{

const [dataObj, setDataObj] =  useState([]);

const options = {
    chart:{
        plotBackgroundColor: null,
plotBorderWidth: null,
plotShadow: false,
type: 'pie'
     
    },
    credits:{
      style:{
           display:"none"
      }
    },
    title:{
        text:"Pie Chart"
    },
    tooltip:{
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   
    },
    accessibility: {
point: {
    valueSuffix: '%'
}
}, plotOptions: {
pie: {
    allowPointSelect: true,
    cursor: 'pointer',
    dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        connectorColor: 'silver'
    }
}
},
   
      series:[
         
       {  name: 'No. Of Comments',
          data:dataObj
       }
    ]
}

    
// this function will load the api data and set the values inside data object for representation
    useEffect(()=>{
        Axios.get('https://api.github.com/repositories/19438/issues').then((res)=>{
            const {data} = res;            
            let pieObj = data.map(item=>{
                let {login} = item.user;
                let {comments} = item;

                return {
                    name:login,
                    y:comments
                }
            })

            setDataObj([...pieObj]);
        });

   
       
    }, [])

    const handleSignOut = ()=>{
        
            signOut();
    }
    
    return(
       <Container fluid>
            <nav className="navbar navbar-default">
               <div className="container-fluid">
                <div className="navbar-header">
                   <span className="navbar-brand" >Dashboard</span>
                </div>
               <ul class="nav navbar-nav">
                <li class="active"><Button color="success" className="mb-20" onClick={()=>{handleSignOut()}}>Sign Out</Button></li>
               </ul>
               </div>
              </nav>
           <h1>Hello, {userObj[0].username}</h1>
          
         <HighchartsReact highcharts={HighCharts} options={options}/>
         
       </Container>
    )
}

export default PieChart;