import { useEffect, useState }
from "react"

import {
  collection,
  getDocs
}
from "firebase/firestore"

import { db }
from "./firebase"

export default function App() {

  const [workers, setWorkers] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [selectedWorker,
    setSelectedWorker] =
      useState(null)

  useEffect(() => {

    loadWorkers()

  }, [])

  const loadWorkers = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "workers")
      )

    const data = []

    querySnapshot.forEach((doc) => {

      data.push({
        id: doc.id,
        ...doc.data()
      })
    })

    setWorkers(data)
  }

  const filteredWorkers =

    workers.filter((worker) => {

      const text =
        search.toLowerCase()

      return (

        worker.name
          ?.toLowerCase()
          .includes(text)

        ||

        worker.skill
          ?.toLowerCase()
          .includes(text)

        ||

        worker.location
          ?.toLowerCase()
          .includes(text)
      )
    })

  /* PROFILE SCREEN */

  if (selectedWorker) {

    return (

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          fontFamily: "Arial"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(90deg,#f97316,#fb923c)",

            padding: "20px",

            color: "white",

            display: "flex",

            alignItems: "center",

            gap: "15px"
          }}
        >

          <button

            onClick={() =>
              setSelectedWorker(null)
            }

            style={{
              background: "white",

              color: "#111",

              border: "none",

              padding:
                "10px 18px",

              borderRadius: "12px",

              cursor: "pointer",

              fontWeight: "bold"
            }}
          >
            ← Back
          </button>

          <h2
            style={{
              margin: 0
            }}
          >
            Worker Profile
          </h2>

        </div>

        <div
          style={{
            maxWidth: "900px",

            margin: "40px auto",

            background: "white",

            borderRadius: "30px",

            overflow: "hidden",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >

          <img
            src={
              selectedWorker.imageUrl ||

              "https://via.placeholder.com/600"
            }

            alt={selectedWorker.name}

            style={{
              width: "100%",

              height: "400px",

              objectFit: "cover"
            }}
          />

          <div
            style={{
              padding: "35px"
            }}
          >

            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                flexWrap: "wrap"
              }}
            >

              <h1
                style={{
                  margin: 0,

                  color: "#111827"
                }}
              >
                {selectedWorker.name}
              </h1>

              <div
                style={{
                  background: "#DCFCE7",

                  color: "#15803D",

                  padding:
                    "10px 18px",

                  borderRadius: "14px",

                  fontWeight: "bold",

                  fontSize: "18px"
                }}
              >
                ⭐ {selectedWorker.rating || 0}
              </div>

            </div>

            <p
              style={{
                fontSize: "22px",

                color: "#6B7280",

                marginTop: "15px"
              }}
            >
              {selectedWorker.skill}
            </p>

            <p
              style={{
                color: "#374151",

                fontSize: "18px"
              }}
            >
              📍 {selectedWorker.location}
            </p>

            <p
              style={{
                color: "#374151",

                fontSize: "18px"
              }}
            >
              📞 {selectedWorker.phone}
            </p>

            <p
              style={{
                color: "#374151",

                fontSize: "18px"
              }}
            >
              💼 Experience:
              {" "}
              {selectedWorker.experience ||
                "5 Years"}
            </p>

            <p
              style={{
                color: "#374151",

                fontSize: "18px",

                lineHeight: "1.8",

                marginTop: "20px"
              }}
            >
              {selectedWorker.about ||

                "Professional skilled worker with quality service and customer satisfaction."}
            </p>

            <div
              style={{
                display: "flex",

                gap: "15px",

                marginTop: "35px",

                flexWrap: "wrap"
              }}
            >

              <a
                href={
                  `tel:${selectedWorker.phone}`
                }

                style={{
                  flex: 1,

                  textAlign: "center",

                  background:
                    "#2563EB",

                  color: "white",

                  padding: "16px",

                  borderRadius: "16px",

                  textDecoration:
                    "none",

                  fontWeight: "bold",

                  fontSize: "18px"
                }}
              >
                Call Now
              </a>

              <a
                href={
                  `https://wa.me/91${selectedWorker.phone}`
                }

                target="_blank"

                rel="noreferrer"

                style={{
                  flex: 1,

                  textAlign: "center",

                  background:
                    "#16A34A",

                  color: "white",

                  padding: "16px",

                  borderRadius: "16px",

                  textDecoration:
                    "none",

                  fontWeight: "bold",

                  fontSize: "18px"
                }}
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>
    )
  }

  /* HOME SCREEN */

  return (

    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(90deg,#f97316,#fb923c)",

          padding: "25px",

          color: "white",

          position: "sticky",

          top: 0,

          zIndex: 100,

          boxShadow:
            "0 4px 20px rgba(0,0,0,0.1)"
        }}
      >

        <div
          style={{
            maxWidth: "1200px",

            margin: "auto",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            gap: "20px"
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,

                fontSize: "34px",

                fontWeight: "bold"
              }}
            >
              LOCALWORKER
            </h1>

            <p
              style={{
                marginTop: "6px",

                opacity: 0.9
              }}
            >
              Find Skilled Workers Near You
            </p>

          </div>

          <input
            type="text"

            placeholder=
              "Search workers..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            style={{
              width: "350px",

              maxWidth: "100%",

              padding: "16px",

              borderRadius: "16px",

              border: "none",

              outline: "none",

              fontSize: "16px"
            }}
          />

        </div>

      </div>

      {/* HERO */}

      <div
        style={{
          maxWidth: "1200px",

          margin: "40px auto",

          padding: "20px"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(135deg,#fff7ed,#ffffff)",

            borderRadius: "30px",

            padding: "50px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.06)"
          }}
        >

          <h1
            style={{
              fontSize: "52px",

              margin: 0,

              color: "#111827"
            }}
          >
            Hire Trusted Workers
          </h1>

          <p
            style={{
              fontSize: "20px",

              marginTop: "16px",

              color: "#6b7280"
            }}
          >
            Find plumbers, electricians,
            painters, tiles workers and more.
          </p>

        </div>

      </div>

      {/* WORKERS */}

      <div
        style={{
          maxWidth: "1200px",

          margin: "auto",

          padding: "20px"
        }}
      >

        <h2
          style={{
            color: "#111827",

            marginBottom: "25px"
          }}
        >
          Top Workers
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",

            gap: "25px"
          }}
        >

          {filteredWorkers.map(
            (worker, index) => (

            <div
              key={index}

              style={{
                background: "white",

                borderRadius: "26px",

                overflow: "hidden",

                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)"
              }}
            >

              <img
                src={
                  worker.imageUrl ||

                  "https://via.placeholder.com/400"
                }

                alt={worker.name}

                style={{
                  width: "100%",

                  height: "240px",

                  objectFit: "cover"
                }}
              />

              <div
                style={{
                  padding: "24px"
                }}
              >

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center"
                  }}
                >

                  <h2
                    style={{
                      margin: 0,

                      color: "#111827"
                    }}
                  >
                    {worker.name}
                  </h2>

                  <div
                    style={{
                      background: "#DCFCE7",

                      color: "#15803D",

                      padding:
                        "8px 14px",

                      borderRadius: "12px",

                      fontWeight: "bold"
                    }}
                  >
                    ⭐ {worker.rating || 0}
                  </div>

                </div>

                <p
                  style={{
                    marginTop: "12px",

                    color: "#6B7280",

                    fontSize: "18px"
                  }}
                >
                  {worker.skill}
                </p>

                <p
                  style={{
                    color: "#4B5563"
                  }}
                >
                  📍 {worker.location}
                </p>

                <div
                  style={{
                    display: "flex",

                    gap: "12px",

                    marginTop: "25px",

                    flexWrap: "wrap"
                  }}
                >

                  <button

                    onClick={() =>
                      setSelectedWorker(worker)
                    }

                    style={{
                      flex: 1,

                      background:
                        "#111827",

                      color: "white",

                      padding: "14px",

                      borderRadius: "14px",

                      border: "none",

                      fontWeight: "bold",

                      cursor: "pointer"
                    }}
                  >
                    View Profile
                  </button>

                  <a
                    href={`tel:${worker.phone}`}

                    style={{
                      flex: 1,

                      textAlign: "center",

                      background:
                        "#2563EB",

                      color: "white",

                      padding: "14px",

                      borderRadius: "14px",

                      textDecoration:
                        "none",

                      fontWeight: "bold"
                    }}
                  >
                    Call
                  </a>

                  <a
                    href={
                      `https://wa.me/91${worker.phone}`
                    }

                    target="_blank"

                    rel="noreferrer"

                    style={{
                      flex: 1,

                      textAlign: "center",

                      background:
                        "#16A34A",

                      color: "white",

                      padding: "14px",

                      borderRadius: "14px",

                      textDecoration:
                        "none",

                      fontWeight: "bold"
                    }}
                  >
                    WhatsApp
                  </a>

                  <button

                    onClick={() => {

                      const rating =
                        prompt(
                          `Rate ${worker.name} (1-5)`
                        )

                      if (
                        rating >= 1 &&
                        rating <= 5
                      ) {

                        worker.rating =
                          Number(rating)

                        setWorkers(
                          [...workers]
                        )
                      }
                    }}

                    style={{
                      flex: 1,

                      background:
                        "#F59E0B",

                      color: "white",

                      padding: "14px",

                      borderRadius: "14px",

                      border: "none",

                      fontWeight: "bold",

                      cursor: "pointer"
                    }}
                  >
                    Rate Worker
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}