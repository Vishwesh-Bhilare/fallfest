// ============================================================
//  Schedule Data
//  type: "talk" | "workshop" | "panel" | "hands-on" | "break"
//  Replace with real schedule before launch.
// ============================================================

window.SCHEDULE_DATA = [
  // DAY 1
  {
    day: "day1",
    dayLabel: "Day 1 — Oct 10",
    sessions: [
      {
        time: "09:00",
        timeEnd: "09:30",
        title: "Registration & Welcome Coffee",
        speaker: "",
        type: "break",
        desc: "Arrival, badge collection, and networking. Grab a coffee and meet fellow quantum enthusiasts."
      },
      {
        time: "09:30",
        timeEnd: "10:30",
        title: "Opening Ceremony & Keynote: A Decade of Quantum on Cloud",
        speaker: "Dr. Priya Sharma",
        type: "talk",
        desc: "A panoramic view of ten years of quantum computing — from the first cloud QPU to today's utility-scale systems. What have we learned, and where are we going?"
      },
      {
        time: "10:45",
        timeEnd: "11:45",
        title: "Quantum Computing 101: From Bits to Qubits",
        speaker: "Prof. Marcus Webb",
        type: "talk",
        desc: "An accessible introduction to quantum computing principles — superposition, entanglement, and interference — for participants with no prior quantum background."
      },
      {
        time: "12:00",
        timeEnd: "13:30",
        title: "Hands-On: Your First Quantum Circuit with Qiskit",
        speaker: "Rahul Verma",
        type: "hands-on",
        desc: "Build and run your first quantum circuit on real IBM quantum hardware using Qiskit. Laptops required. No prior programming experience needed beyond basic Python."
      },
      {
        time: "13:30",
        timeEnd: "14:30",
        title: "Lunch Break & Networking",
        speaker: "",
        type: "break",
        desc: "Lunch provided. Great opportunity to connect with speakers and fellow attendees."
      },
      {
        time: "14:30",
        timeEnd: "15:30",
        title: "Variational Quantum Algorithms in the NISQ Era",
        speaker: "Dr. Kenji Watanabe",
        type: "talk",
        desc: "Deep dive into VQE, QAOA, and other variational approaches. What can we solve today, and what are the practical limitations?"
      },
      {
        time: "15:45",
        timeEnd: "17:00",
        title: "Workshop: Quantum Error Mitigation with Qiskit",
        speaker: "Dr. Priya Sharma",
        type: "workshop",
        desc: "Practical techniques for getting better results from noisy quantum hardware. Covers zero-noise extrapolation and probabilistic error cancellation."
      },
      {
        time: "17:00",
        timeEnd: "17:30",
        title: "Panel: Quantum Education — Challenges & Opportunities",
        speaker: "All Day 1 Speakers",
        type: "panel",
        desc: "An open discussion on quantum literacy, curriculum design, and how to build the next generation of quantum scientists and engineers."
      }
    ]
  },
  // DAY 2
  {
    day: "day2",
    dayLabel: "Day 2 — Oct 11",
    sessions: [
      {
        time: "09:00",
        timeEnd: "09:30",
        title: "Morning Coffee & Open Networking",
        speaker: "",
        type: "break",
        desc: "Informal start to the day. Continue conversations from Day 1."
      },
      {
        time: "09:30",
        timeEnd: "10:30",
        title: "Quantum Hardware: Inside the Superconducting Qubit",
        speaker: "Dr. Aisha Okonkwo",
        type: "talk",
        desc: "How do quantum processors actually work? A look inside the engineering of superconducting qubits — from chip design to dilution refrigerators."
      },
      {
        time: "10:45",
        timeEnd: "12:00",
        title: "Hands-On: Quantum Chemistry Simulation",
        speaker: "Dr. Kenji Watanabe",
        type: "hands-on",
        desc: "Simulate molecular ground states using VQE on IBM Quantum systems. Practical Qiskit Nature tutorial with real hardware execution."
      },
      {
        time: "12:00",
        timeEnd: "13:30",
        title: "Lunch & Project Showcase",
        speaker: "",
        type: "break",
        desc: "Lunch provided. Student and community project showcase — bring your quantum experiments to share."
      },
      {
        time: "13:30",
        timeEnd: "14:30",
        title: "The Quantum Internet: Entanglement at Scale",
        speaker: "Dr. Sofia Mendes",
        type: "talk",
        desc: "What would a global quantum network look like? From quantum repeaters to quantum memory — the engineering challenges of distributing entanglement."
      },
      {
        time: "14:45",
        timeEnd: "16:00",
        title: "Workshop: Building with Qiskit Runtime",
        speaker: "Rahul Verma",
        type: "workshop",
        desc: "Use Qiskit Runtime primitives (Sampler, Estimator) to build scalable quantum-classical hybrid applications on IBM Cloud."
      },
      {
        time: "16:00",
        timeEnd: "17:00",
        title: "Panel: The Next Decade — Where Is Quantum Heading?",
        speaker: "All Speakers",
        type: "panel",
        desc: "A forward-looking conversation about fault-tolerant quantum computing, quantum advantage, and the societal implications of quantum technology."
      },
      {
        time: "17:00",
        timeEnd: "17:30",
        title: "Closing Ceremony & Certificate Distribution",
        speaker: "",
        type: "break",
        desc: "Closing remarks, thank-yous, and certificate distribution for all registered participants."
      }
    ]
  }
];
