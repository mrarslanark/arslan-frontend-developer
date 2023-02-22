import { useEffect, useState } from "react";
import { makeUnique } from "./utils";

function App() {
  const [capsules, setCapsules] = useState([]);

  const [statuses, setStatuses] = useState<any>([]);
  const [launches, setLaunches] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);

  useEffect(() => {
    getCapsules();
  }, []);

  async function getCapsules() {
    try {
      const url = process.env.REACT_APP_DATASET_URL as string;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Unable to fetch data from SpaceX Data Center");
      }
      const json = await res.json();
      const uniqueStatues = makeUnique(json, "status");
      const uniqueLaunches = makeUnique(json, "original_launch");
      const uniqueTypes = makeUnique(json, "type");
      setStatuses(uniqueStatues);
      setLaunches(uniqueLaunches);
      setTypes(uniqueTypes);
      setCapsules(json);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Header */}
      <header>
        <h1>RocketX</h1>
      </header>
      {/* Banner */}
      <section>
        <div>
          <h2>The Title of Your Online Course</h2>
          <h3>Learn how to do things faster and better</h3>
          <p>
            Create a compelling summary of your course content and the key
            benefits for subscribers
          </p>
        </div>
      </section>
      {/* Search Bar */}
      <section>
        <form>
          <div>
            <input type="text" name="text" placeholder="Search Capsules" />
            <input type="submit" name="submit" value="Search" />
          </div>
          <p>Filters</p>
          {statuses ? (
            <select>
              <option disabled selected color="gray">
                Select Status
              </option>
              {statuses.sort().map((status: string) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          ) : null}
          {launches ? (
            <select>
              <option disabled selected color="gray">
                Select Original Launch Date
              </option>
              {launches.sort().map((launch: string) => (
                <option key={launch}>{launch}</option>
              ))}
            </select>
          ) : null}
          {types ? (
            <select>
              <option disabled selected color="gray">
                Select Type
              </option>
              {types.sort().map((type: string) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          ) : null}
        </form>
      </section>
      {/* Data Grid */}
      <section>
        {capsules
          ? capsules.map((capsule: any) => {
              return (
                <div key={capsule.capsule_id}>
                  <h4>{capsule.capsule_serial}</h4>
                  <p>{capsule.details ?? "Details unavailable"}</p>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
}

export default App;
