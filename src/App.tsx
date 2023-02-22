import { useEffect, useState } from "react";
import { makeUnique } from "./utils";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

function App() {
  const [capsules, setCapsules] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isFilterActive, setFilterActive] = useState(false);

  const [statuses, setStatuses] = useState<any>([]);
  const [launches, setLaunches] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLaunchDate, setSelectedLaunchDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
      setFilteredData(json);
    } catch (err) {
      console.error(err);
    }
  }

  function handleStatusSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedStatus(e.target.value);
  }

  function handleLaunchDateSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedLaunchDate(e.target.value);
  }

  function handleTypeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedType(e.target.value);
  }

  async function handleFilterApply(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setFilterActive(true);
    const url = new URL("", process.env.REACT_APP_DATASET_URL as string);
    const avoid = "default";

    if (selectedStatus && selectedStatus !== avoid) {
      url.searchParams.set("status", selectedStatus);
    }

    if (selectedLaunchDate && selectedLaunchDate !== avoid) {
      url.searchParams.set("original_launch", selectedLaunchDate);
    }

    if (selectedType && selectedType !== avoid) {
      url.searchParams.set("type", selectedType);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error("Unable to fetch data from SpaceX Data Center");
    }
    const json = await res.json();
    setFilteredData(json);
  }

  function clearFilters(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSelectedLaunchDate("");
    setSelectedStatus("");
    setSelectedType("");
    setFilteredData(capsules);
  }

  const validateFilters =
    selectedType === "" && selectedStatus === "" && selectedLaunchDate === "";

  return (
    <>
      {/* Header */}
      <header>
        <h1>SpaceX</h1>
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
          <p>Filters Capsules</p>
          {statuses ? (
            <select
              onChange={handleStatusSelect}
              value={selectedStatus ?? "default"}
            >
              <option value="default">Choose Status</option>
              {statuses.sort().map((status: string) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : null}
          {launches ? (
            <select
              onChange={handleLaunchDateSelect}
              value={selectedLaunchDate}
            >
              <option value="default">Choose Launch Date</option>
              {launches.sort().map((launch: string) => (
                <option key={launch} value={launch}>
                  {launch ? dayjs(launch).format("LL") : "Unknown"}
                </option>
              ))}
            </select>
          ) : null}
          {types ? (
            <select onChange={handleTypeSelect} value={selectedType}>
              <option value="default">Choose Type</option>
              {types.sort().map((type: string) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          ) : null}
          <button onClick={handleFilterApply} disabled={validateFilters}>
            Apply
          </button>
          {isFilterActive ? (
            <button onClick={clearFilters}>Clear Filters</button>
          ) : null}
        </form>
      </section>
      {/* Data Grid */}
      <section>
        {filteredData
          ? filteredData.map((capsule: any) => {
              return (
                <div key={capsule.capsule_serial}>
                  <h4>{capsule.capsule_serial}</h4>
                  <p>{capsule.details ?? "Details unavailable"}</p>
                  <p>Status: {capsule.status}</p>
                  <p>
                    Original Launch:{" "}
                    {capsule.original_launch
                      ? dayjs(capsule.original_launch).format("LL")
                      : "Unknown"}
                  </p>
                  <p>Type: {capsule.type}</p>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
}

export default App;
