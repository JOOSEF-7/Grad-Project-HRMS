const skillSynonyms = {
    js: "javascript",
    es6: "javascript",
    ecmascript: "javascript",
    ts: "typescript",
    py: "python",
    python3: "python",
    cpp: "c++",
    cplusplus: "c++",
    "c sharp": "c#",
    csharp: "c#",
    golang: "go",
    "core java": "java",
    j2ee: "java",

    react: "react.js",
    reactjs: "react.js",
    vue: "vue.js",
    vuejs: "vue.js",
    angularjs: "angular",
    html5: "html",
    css3: "css",
    tailwind: "tailwindcss",
    bootstrap5: "bootstrap",
    rn: "react native",
    "flutter framework": "flutter",

    node: "node.js",
    nodejs: "node.js",
    express: "express.js",
    expressjs: "express.js",
    nest: "nest.js",
    nestjs: "nest.js",
    "django framework": "django",
    "spring boot": "springboot",
    dotnet: ".net",
    "asp.net": ".net",
    ror: "ruby on rails",

    mongo: "mongodb",
    "mongo db": "mongodb",
    postgres: "postgresql",
    psql: "postgresql",
    mysql: "sql", 
    "ms sql": "sql server",
    mssql: "sql server",
    dynamo: "dynamodb",

    aws: "amazon web services",
    gcp: "google cloud",
    "azure cloud": "azure",
    k8s: "kubernetes",
    "ci cd": "ci/cd",
    cicd: "ci/cd",
    "github actions": "ci/cd",
    vcs: "git",

    ml: "machine learning",
    ai: "artificial intelligence",
    nlp: "natural language processing",
    tf: "tensorflow",
    sklearn: "scikit-learn",
    pytorch: "torch",
    np: "numpy",
    pd: "pandas",
};


const normalizeSkill = (skill) => {
    const cleaned = skill.toLowerCase().trim();

    return skillSynonyms[cleaned] || cleaned;
};

export const calculateSkillsMatch = (jobSkills = [], applicantSkills = []) => {
    if (jobSkills.length === 0) return 1.0;

    const jSkills = new Set(jobSkills.map((s) => normalizeSkill(s)));
    const aSkills = new Set(applicantSkills.map((s) => normalizeSkill(s)));

    const intersection = new Set([...jSkills].filter((x) => aSkills.has(x)));

    return intersection.size / jSkills.size;
};

export const calculateEducationMatch = (jobEducation, applicantEducation) => {
    const educationWeights = {
        "High School": 1,
        "Bachelor's": 2,
        "Master's": 3,
        PhD: 4,
    };

    const jobWeight = educationWeights[jobEducation] || 2;
    const applicantWeight = educationWeights[applicantEducation] || 0;

    return applicantWeight >= jobWeight ? 1.0 : 0.0;
};
