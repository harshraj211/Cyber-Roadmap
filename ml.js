// ═══════════════════════════════════════════════
// CyberNav ML Recommender — Browser-compatible
// Generated from Colab notebook
// Model: Random Forest → CV Accuracy: 84.2%
// ═══════════════════════════════════════════════

const CN_ML = {

  // Training data (all 120 samples)
  trainingX: [[0,2,0,0,1,1,0,2],[0,2,1,0,1,1,0,2],[0,1,0,0,1,2,0,2],[0,2,1,0,2,1,0,2],[0,1,1,0,1,1,0,2],[0,2,0,0,2,0,0,2],[1,2,0,0,1,1,0,2],[0,2,1,1,1,2,0,2],[0,1,0,0,0,1,0,2],[0,2,0,0,1,0,1,2],[0,2,2,0,2,1,0,2],[1,1,0,0,1,1,0,2],[0,2,0,1,1,2,0,2],[0,2,1,0,1,1,1,2],[0,1,2,0,0,2,0,2],[0,1,0,1,1,0,2,0],[0,1,0,1,1,0,2,1],[0,0,0,1,1,0,2,0],[0,1,1,2,1,1,2,0],[0,2,0,1,2,0,1,0],[0,0,0,2,0,0,2,0],[0,1,1,1,1,1,2,1],[0,2,0,1,2,0,2,0],[0,1,0,0,1,0,2,0],[0,0,1,1,1,0,2,1],[0,1,0,2,1,0,2,0],[0,2,0,1,0,1,2,0],[0,1,0,1,2,0,1,0],[0,0,0,1,1,0,2,0],[0,1,1,2,1,1,2,1],[2,2,0,1,1,0,0,0],[2,2,0,0,2,0,0,0],[2,1,0,1,1,0,0,0],[2,2,0,0,1,0,1,0],[2,2,0,1,2,0,0,1],[1,2,0,0,1,0,0,0],[2,1,0,0,1,0,0,0],[2,2,1,1,1,0,0,0],[2,2,0,0,2,0,0,1],[2,1,0,1,0,0,0,0],[2,2,0,0,1,1,0,0],[2,2,0,2,1,0,0,0],[1,2,0,1,2,0,0,0],[2,1,0,0,1,0,1,0],[2,2,0,1,1,0,0,0],[0,0,2,0,0,2,0,0],[0,0,2,0,0,2,0,1],[0,1,2,0,0,2,0,0],[0,0,2,0,1,2,1,0],[0,0,1,0,0,2,0,0],[0,1,2,0,0,1,0,0],[0,0,2,0,0,2,1,1],[0,0,2,0,1,2,0,0],[0,0,2,0,0,2,0,0],[0,1,1,0,0,2,1,0],[0,0,2,0,0,2,0,1],[0,0,2,1,0,2,0,0],[0,1,2,0,1,1,0,0],[0,0,2,0,0,2,1,0],[0,0,2,0,0,2,0,0],[0,1,1,2,1,0,2,0],[0,1,0,1,1,0,2,0],[0,2,1,2,1,1,2,0],[0,1,1,1,0,0,2,0],[0,0,0,2,1,0,2,0],[0,1,1,2,0,1,2,0],[0,2,0,1,1,0,2,1],[0,1,2,2,1,0,2,0],[0,0,1,2,0,0,2,0],[0,1,0,1,1,0,2,0],[0,2,1,2,1,0,2,0],[0,1,0,2,0,0,2,0],[0,1,1,1,1,0,2,1],[0,0,0,2,1,0,2,0],[0,2,1,2,1,1,2,0],[1,2,0,0,0,0,0,1],[1,2,1,1,0,1,0,1],[1,2,0,0,0,0,0,2],[2,2,0,0,0,0,0,1],[1,2,1,0,1,1,0,1],[1,2,0,1,0,0,0,1],[1,2,0,0,0,0,1,2],[2,2,0,0,1,0,0,1],[1,2,1,0,0,0,0,0],[1,1,0,0,0,0,0,1],[1,2,0,1,0,1,0,1],[2,2,0,0,0,0,0,2],[1,2,0,0,1,0,0,1],[1,2,1,0,0,0,1,1],[1,2,0,0,0,0,0,1],[0,1,0,0,2,0,0,1],[0,0,0,0,2,0,0,0],[0,1,1,0,2,1,0,0],[0,0,0,0,2,0,1,1],[0,1,0,0,2,0,0,1],[0,2,0,0,2,0,0,0],[0,0,1,0,2,1,0,0],[0,1,0,0,2,0,0,1],[0,0,0,0,2,0,0,0],[1,1,0,0,2,0,0,0],[0,1,1,0,2,1,1,0],[0,0,0,0,2,0,0,1],[0,1,0,1,2,0,0,0],[0,0,0,0,2,0,0,0],[0,2,1,0,2,0,0,1],[1,2,0,2,0,0,1,0],[1,2,0,2,1,0,0,0],[0,2,0,2,0,0,2,0],[1,1,0,2,0,0,1,0],[1,2,0,2,0,0,0,0],[0,2,1,2,0,0,2,0],[1,2,0,2,1,0,1,0],[0,2,0,2,0,0,2,0],[1,1,0,2,0,0,1,0],[1,2,0,2,0,1,0,0],[0,2,0,2,1,0,2,0],[1,2,1,2,0,0,1,0],[1,2,0,2,0,0,0,0],[0,1,0,2,0,0,2,0],[1,2,0,2,1,0,1,0]],
  trainingY: ["cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "soc", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "pentest", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "grc", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "dfir", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "appsec", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "network", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware", "malware"],

  features: ["prefers_offense", "coding_comfort", "likes_docs_policy", "malware_curiosity", "network_interest", "risk_compliance", "forensics_mindset", "cloud_comfort"],
  branches: ["cloud", "soc", "pentest", "grc", "dfir", "appsec", "network", "malware"],
  branchNames: {"cloud": "Cloud Security", "soc": "SOC Analyst / Blue Team", "pentest": "Penetration Testing", "grc": "GRC / Compliance", "dfir": "Digital Forensics & IR", "appsec": "AppSec / DevSecOps", "network": "Network Security", "malware": "Malware Analysis"},

  featureImportance: {"cloud_comfort": 0.16911035361198803, "network_interest": 0.16075035535199889, "prefers_offense": 0.14693715625881235, "malware_curiosity": 0.1207827139973761, "coding_comfort": 0.11203018365638018, "likes_docs_policy": 0.10627939947297839, "forensics_mindset": 0.09259095744211636, "risk_compliance": 0.09151888020834972},

  // Weighted KNN prediction (k=7, weights by feature importance)
  predict(answers) {
    const weights = this.features.map(f => this.featureImportance[f] || 0.1);
    const K = 7;

    // Compute weighted Euclidean distance to every training sample
    const distances = this.trainingX.map((sample, idx) => {
      let dist = 0;
      for (let i = 0; i < sample.length; i++) {
        dist += weights[i] * Math.pow(answers[i] - sample[i], 2);
      }
      return { dist: Math.sqrt(dist), label: this.trainingY[idx] };
    });

    // Get K nearest neighbours
    distances.sort((a, b) => a.dist - b.dist);
    const kNearest = distances.slice(0, K);

    // Vote (weight by 1/distance)
    const votes = {};
    kNearest.forEach(n => {
      const w = n.dist === 0 ? 1000 : 1 / n.dist;
      votes[n.label] = (votes[n.label] || 0) + w;
    });

    // Sort by votes
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const totalVotes = sorted.reduce((s, [, v]) => s + v, 0);

    return {
      branch: sorted[0][0],
      confidence: Math.round(sorted[0][1] / totalVotes * 100),
      top3: sorted.slice(0, 3).map(([b, v]) => ({
        branch: b,
        name: this.branchNames[b],
        confidence: Math.round(v / totalVotes * 100)
      }))
    };
  }
};
