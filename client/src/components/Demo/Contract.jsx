import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Contract({ value , text}) {
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();
  const { state: { contract}} = useEth();


  useEffect(() => {

  (async function () {

    // METHODE 1

    let oldEvents = await contract.getPastEvents('valueChanged', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    let oldies = [];

    oldEvents.forEach(event => {

        oldies.push(event.returnValues._val);
    });

    setOldEvents(oldies);


    // METHODE 2

    await contract.events.valueChanged({fromBlock:"earliest"})
        .on('data', event => {
	        //console.log(event.returnValues.NAMEVAR);
          let lesevents = event.returnValues._val;
          setEventValue(lesevents);
        })          
        .on('changed', changed => console.log(changed))
	      .on('error', err => console.log(err))
        .on('connected', str => console.log(str))

        })();
   
  }, [contract]);



  /*useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);*/

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}

      <span className="secondary-color" >
        <strong>{value}</strong>
      </span>

      {`;

string text = `}

<span className="secondary-color" >
  <strong>{text}</strong>
</span>

{`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

  function greet() publilc returns (string memory){
    return greeter;
  }

  function setgreet(string calldata newValue) public{
    greeter = newValue;
  }
}

  Events arriving: `} {EventValue} {`

  Old events: `} {oldEvents} 

    </code>
  );
}

export default Contract;
