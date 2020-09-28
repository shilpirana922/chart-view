import React, { useEffect, useState} from "react";
import Axios from "axios";
import {Container, Button} from "reactstrap";
import HighCharts from "highcharts"
import HighchartsReact from "highcharts-react-official"


const LineChart = ({userObj, signOut})=>{
const [categories, setCategories] =  useState({});
const [dataObj, setDataObj] =  useState([]);
const options = {
    chart:{
      type:'areaspline',
     
    },
    credits:{
      style:{
       display:"none"
      }
    },
    title:{
        text:"Our Line Chart"
    },
    tooltip:{
     formatter(){
        return `date: ${this.x} , No. of comments: ${this.y}`;
    }
   
    },
    yAxis:{
        title:{
            text:'No. Of Comments'
        }
    },
      xAxis:{
        categories: categories
      },

      series:[
         
       { 
          
          data:dataObj
       }
    ]
}



    
// this hook will load the categories and dataobject for line chart representation
    useEffect(()=>{
        Axios.get('https://api.github.com/repositories/19438/issues').then((res)=>{
            const {data} = res;            
            let categories =  data.map((item)=>{
            let {created_at} = item;
                 return created_at;
            })
          
            let dataobj2 = data.map((item,index)=>{
                     let arr=[];
                 arr[0] = index;
                 arr[1] = item.comments;
     
                 return arr;
                 })
                 setCategories(categories);
                 setDataObj([...dataobj2]);
                
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

export default LineChart;