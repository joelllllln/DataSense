/* Model usage guide — for EVERY model topic: when to use it, its limitations,
   whether it needs feature scaling, and its pros & cons. All are DEFINITION
   questions (tagged into read-and-recall) and each carries a reveal, so they
   also become flashcards. choices[0] is always correct (shuffled at render).
   Loads AFTER the base topic files, BEFORE data_defs_rank.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function g(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1; R[nk(name)] = 2;
  }

  /* ===== KNN ===== */

  g("medium",
    "When is KNN actually a good choice?",
    "Small-to-medium datasets with few, meaningful features where the decision boundary is irregular and you want a no-training baseline fast.",
    ["Large, high-dimensional datasets where its instance-based memory scales gracefully and distances stay informative across many features.",
     "Streaming applications with tight latency budgets, since having no training phase means its predictions are also effectively instant.",
     "Text and image problems specifically, because raw pixel and token distances are the most reliable similarity signals available.",
     "Any problem where interpretability matters most, since each prediction comes with a single global rule explaining the whole model."],
    "When to use KNN",
    "Reach for KNN when the data is small enough to search quickly, the features are few and genuinely meaningful, and the class boundary is too irregular for a simple parametric shape. It's a strong quick baseline: zero training, decent accuracy, and its mistakes tell you about your distance metric.",
    "KNN's fit is instant but every PREDICTION searches the training set — so it suits small data, not big; and distance concentration makes it fail in high dimensions. The boundary it produces is as wiggly as the data demands, which parametric models can't always match. It explains locally ('these 5 neighbours'), not globally.",
    "A great first weapon on small, clean, low-dimensional data — and a famously bad one on big or wide data.");

  g("easy",
    "What is the core limitation of KNN?",
    "Prediction cost and memory grow with the training set, and in high dimensions distances concentrate so 'nearest' stops meaning anything.",
    ["It can only draw straight-line decision boundaries, so any problem with curved class borders is fundamentally out of its reach.",
     "It requires a long, compute-heavy training phase before the first prediction, which rules it out for quickly-assembled baselines.",
     "It only works when classes are perfectly balanced, since the majority class otherwise wins every single neighbourhood vote.",
     "It cannot output probabilities of any kind, because voting produces a class label with no notion of confidence attached to it."],
    "KNN limitations",
    "• No training cost, but every prediction searches the whole training set\n• Memory-heavy — the model IS the dataset\n• Curse of dimensionality: distances concentrate, ‘nearest’ stops meaning anything\n• Must scale features — one wide-range column dominates the distance\n• Irrelevant features poison every distance\n• Imbalanced neighbourhoods skew the vote (distance-weighting helps)",
    "The two structural weaknesses: inference cost scales with data size (the opposite of most models), and high-dimensional distance concentration — everyone becomes equally far, so neighbours are meaningless. Wiggly boundaries it handles fine; probabilities come from vote fractions; imbalance hurts but distance-weighting mitigates.",
    "It never forgets — that's the problem: predictions drag the whole dataset along, and in wide data 'nearest' goes blind.");

  g("medium",
    "Does KNN need feature scaling?",
    "Yes, critically — distances are its entire engine, so an unscaled large-range feature silently dominates every neighbour calculation.",
    ["No — the neighbour ranking is invariant to any monotone transformation of the features, so scaling merely relabels the same neighbours.",
     "Only when the dataset has more than a few thousand rows, since below that size the distance distortions are too small to change any vote.",
     "Only for the regression variant; classification votes are decided by counts, which are unaffected by how far away the neighbours sit.",
     "No — modern implementations standardise internally as part of building the k-d tree, so manual scaling would apply the correction twice."],
    "KNN & scaling",
    "Scaling is essential. Income in pounds (range ~100,000) versus age in years (range ~80) means income differences dwarf age differences in every Euclidean distance — age effectively vanishes. Standardise or min-max scale first, always; distance-based methods live or die by comparable units.",
    "Per-feature monotone transforms DO change multi-dimensional distances (that invariance claim only holds for a single feature); size doesn't rescue it; classification and regression both rank by distance; and sklearn's KNeighborsClassifier does NOT scale internally — that's your job, ideally in a Pipeline.",
    "One loud feature out-shouts the rest of the room — put every feature in the same units before measuring 'near'.");

  g("medium",
    "What are the honest pros and cons of KNN?",
    "Pros: no training, no distribution assumptions, naturally multi-class, wiggly boundaries. Cons: slow prediction, curse of dimensionality, scale-sensitive, memory-heavy.",
    ["Pros: fastest predictions of any model and immunity to irrelevant features. Cons: long training times and boundaries restricted to straight lines only.",
     "Pros: thrives in thousands of dimensions and compresses data at fit time. Cons: limited to binary problems and requires a differentiable loss to tune.",
     "Pros: strong extrapolation beyond the training range and built-in feature selection. Cons: cannot handle more than two classes without one-vs-rest wrappers.",
     "Pros: probabilistic outputs calibrated by construction and robustness to scaling. Cons: needs gradient descent, so convergence failures are its main risk."],
    "KNN pros & cons",
    "The trade is memory-for-simplicity: keep everything, learn nothing, decide locally at query time. That buys assumption-free flexibility and instant fitting, and costs you at prediction time — linear search (or index-assisted), distance fragility in high dimensions, and total dependence on scaling and feature relevance.",
    "Its strengths and weaknesses are mirror images: no training means no learned compression, so prediction does all the work; no assumptions means no protection when distances degrade. Multi-class is native (neighbours just vote); extrapolation and high dimensions are exactly where it breaks.",
    "Lazy learning: pay nothing up front, pay at every question — flexible where distances work, helpless where they don't.");

  /* ===== Logistic Regression ===== */

  g("logreg1",
    "When is logistic regression the right first choice?",
    "When you need calibrated probabilities, coefficient-level explainability, or a strong baseline on wide/sparse data — especially where the log-odds are roughly linear in the features.",
    ["When the classes are separated by strongly curved, interacting boundaries that a weighted sum of raw features could never approximate at any accuracy.",
     "When the dataset is tiny and nonlinear, since maximum likelihood estimation is specifically designed to recover curvature from limited examples.",
     "When features arrive with wildly different units that will never be scaled, because the sigmoid squashes away any scale differences automatically.",
     "When you expect heavy label noise, since the log-loss objective ignores confidently wrong labels rather than being dominated by them."],
    "When to use logistic regression",
    "The default first classifier for tabular problems: fast, stable, probabilistically honest (usually well-calibrated out of the box), and each coefficient reads as 'this feature pushes the log-odds this way'. It shines on wide sparse data (text, one-hots) where linear structure dominates and fancy models overfit.",
    "Its assumption — log-odds linear in features — is milder than it sounds, and engineered features (interactions, polynomials) extend it. The sigmoid does NOT remove the need for scaling (regularisation is scale-sensitive), and log-loss punishes confident errors hardest, so label noise hurts rather than being ignored.",
    "The sensible default: honest probabilities, readable coefficients, hard to beat on wide sparse data — start here, make the fancy model prove it's better.");

  g("logreg1",
    "What is the core limitation of logistic regression?",
    "Its decision boundary is linear in the given features — curvature and interactions must be hand-engineered in, or the model simply cannot express them.",
    ["It cannot produce probability estimates, only hard class labels, which forces a separate calibration model into every deployment pipeline.",
     "It fails to converge whenever features are correlated, so real-world datasets need decorrelation before the solver will run at all.",
     "It handles only two classes, and no principled multi-class extension exists beyond training separate models per label pair.",
     "Its coefficients are unreadable black-box quantities, which is why tree models are preferred whenever regulators demand explanations."],
    "Logistic regression limitations",
    "• Linear decision boundary only — curvature must be hand-engineered in\n• No interactions unless you build them (x·y terms)\n• Perfect separation → coefficients blow up without regularisation\n• Multicollinearity makes coefficients unstable and unreadable\n• Outliers in the features pull the boundary\n• Needs scaling for regularisation and solver convergence",
    "The linearity is in the FEATURES YOU GIVE IT — x², x·y terms buy curvature at interpretability's cost. Probabilities are its speciality, not a gap; correlated features inflate coefficient variance but don't stop convergence; multinomial (softmax) regression is the principled multi-class form; and its coefficients are the INDUSTRY STANDARD for explainability.",
    "It draws one straight cut through feature space — powerful exactly when straight is right, and blind to every curve you didn't hand-build.");

  g("logreg1",
    "Does logistic regression need feature scaling?",
    "For the model itself no — but in practice yes: regularisation penalises all coefficients equally, so unscaled features are penalised unfairly, and gradient solvers converge faster on standardised data.",
    ["Absolutely never — the sigmoid maps every input to the 0-1 range, which mathematically removes any influence the original feature scales could have had.",
     "Yes, because the log-odds are only defined for features lying between minus one and one, so inputs outside that interval break the likelihood.",
     "Only when using the newton-cg solver; every other optimiser in common use estimates coefficients through a scale-free closed-form solution.",
     "Yes, because unscaled features make the fitted probabilities systematically overconfident, which no amount of regularisation tuning can repair."],
    "Logistic regression & scaling",
    "An unregularised fit on any scale gives equivalent predictions (coefficients just rescale inversely). But almost nobody fits unregularised: L1/L2 penalties compare coefficient sizes across features, and a feature measured in big units gets a small coefficient — under-penalised relative to its real influence. Standardise, especially with regularisation.",
    "The sigmoid squashes the OUTPUT, not the inputs' relative influence; no −1..1 input constraint exists; there is no closed-form solution for logistic regression (all solvers iterate, and all benefit from conditioning); and miscalibration isn't the scaling failure mode — unfair regularisation and slow convergence are.",
    "The model doesn't care about units; the PENALTY does — and you're almost always using a penalty, so scale.");

  g("logreg1",
    "What are the honest pros and cons of logistic regression?",
    "Pros: fast, stable, calibrated probabilities, readable coefficients, great on wide sparse data. Cons: linear boundaries only, needs feature engineering for curvature, sensitive to outliers in feature space.",
    ["Pros: captures arbitrary interactions automatically and is immune to irrelevant columns. Cons: probabilities need external calibration and training is the slowest of the linear family.",
     "Pros: models curved boundaries natively and requires no regularisation choices. Cons: restricted to balanced classes and undefined for more than ten features.",
     "Pros: unaffected by feature scaling under any penalty and robust to perfect separation. Cons: cannot be trained incrementally and has no multi-class formulation.",
     "Pros: extrapolates reliably far outside the training range and never overfits. Cons: coefficients change meaning with every random seed, defeating interpretation."],
    "Logistic regression pros & cons",
    "It trades expressiveness for everything else: speed, stability, small-data reliability, native probabilities, and coefficients you can defend to a regulator. The bill comes due when the truth is nonlinear — and the classic remedies (interaction terms, splines) spend the very interpretability you chose it for.",
    "The genuinely rare virtue is calibration: its probabilities usually mean what they say without post-processing — boosted trees and naive Bayes can't claim that. The genuinely binding limit is expressiveness; everything else (multi-class, streaming via SGD, imbalance via weights) has standard answers.",
    "Fast, honest, explainable, linear — three virtues you keep, one constraint you design around.");

  /* ===== Naive Bayes ===== */

  g("bayes1",
    "When is Naive Bayes actually the right tool?",
    "High-dimensional count data — text above all — where you need a fast, small-data-friendly baseline that trains in one pass and tolerates thousands of features.",
    ["Problems dominated by feature interactions, since factorising the joint likelihood lets it model how features combine rather than treating them separately.",
     "Any task needing well-calibrated probability estimates, because multiplying independent likelihoods yields the most honest confidence scores available.",
     "Small dense numeric datasets with heavily correlated features, where the independence assumption acts as a natural regulariser against double counting.",
     "Image recognition tasks, where per-pixel class-conditional independence is approximately true and gives it an edge over convolutional approaches."],
    "When to use Naive Bayes",
    "Its home turf is text classification: bag-of-words features are many, sparse, and individually weakly informative — exactly where counting per-class word frequencies (one pass, no iteration) produces a shockingly strong baseline. It also tolerates tiny training sets better than most, because it estimates only per-feature statistics.",
    "The independence assumption is what makes it fast AND what it gets wrong: correlated features are double-counted (the opposite of regularised), which distorts probabilities while often leaving the argmax — the predicted class — correct. Hence: good classifier, bad probability estimator; use the label, distrust the confidence.",
    "The one-afternoon baseline for text: count words per class, multiply, done — beat it before you deploy anything fancier.");

  g("bayes1",
    "What is the core limitation of Naive Bayes?",
    "Correlated features get double-counted — the independence assumption multiplies their evidence as if each were new information — driving probabilities toward absurd extremes even when the predicted class stays right.",
    ["It needs enormous training sets before its frequency estimates stabilise, which disqualifies it from the small-data regimes where flexible models overfit.",
     "Training requires many gradient-descent passes over the data, making it one of the slowest classifiers to fit at realistic dataset sizes.",
     "It cannot handle more than a few dozen features, since the joint probability table it stores grows exponentially with every column added.",
     "Its decision rule ignores class priors entirely, so it systematically fails on any dataset where one class outnumbers the other."],
    "Naive Bayes limitations",
    "• Independence assumption is false — correlated features double-count evidence\n• Probabilities badly calibrated (0.9999 confidences); the ranking usually survives\n• Zero-frequency: one unseen value vetoes a class — fix with Laplace smoothing\n• Gaussian NB assumes each numeric feature is normal within a class\n• Cannot learn feature interactions\n• Continuous features often need binning or a distribution choice",
    "Everything else in the list is backwards: NB is the SMALL-data specialist (few parameters, closed-form counting), fits in a single pass with no gradients, scales to hundreds of thousands of features precisely because it never builds a joint table (that's the 'naive' factorisation), and the prior is the first term in its product.",
    "It counts every echoed rumour as a fresh witness — verdicts often right, certainty always inflated.");

  g("bayes1",
    "Does Naive Bayes need feature scaling?",
    "No — it never computes distances or penalised weights: discrete variants use counts, and Gaussian NB fits each feature's own mean and variance per class, which absorbs scale automatically.",
    ["Yes — like every probabilistic classifier it multiplies raw feature values together, so one large-unit feature dominates the product unless standardised first.",
     "Yes for the multinomial variant, where word counts must be scaled to zero mean and unit variance before the class-conditional frequencies make sense.",
     "Only when features are positive, since likelihoods are undefined for negative inputs and scaling into a positive range is what restores them.",
     "No, but only because implementations clip all features into the 0-1 interval on load, which is a hidden scaling step users should account for."],
    "Naive Bayes & scaling",
    "One of the few scale-indifferent families. MultinomialNB consumes counts (standardising word counts to negative values would actually BREAK it); GaussianNB estimates μ and σ per feature per class — measure height in metres or millimetres and the fitted Gaussian adjusts, likelihood unchanged.",
    "NB multiplies probabilities (likelihood evaluations), never raw feature values; nothing clips inputs on load; negative features are fine for Gaussian NB. The practical note: don't standardise counts for multinomial variants — you'd violate their count assumption, the one preprocessing error this family invites.",
    "It measures each feature against that feature's own class statistics — the units cancel before anything is compared.");

  g("bayes1",
    "What are the honest pros and cons of Naive Bayes?",
    "Pros: trains in one pass, thrives on small data and huge sparse feature spaces, naturally incremental. Cons: unreliable probabilities under correlation, crude boundaries, needs smoothing to survive unseen values.",
    ["Pros: models feature interactions richly and yields the field's best-calibrated confidence scores. Cons: slow iterative training and poor scaling beyond a hundred features.",
     "Pros: learns arbitrarily curved decision boundaries from raw pixels. Cons: cannot be updated online and demands class balance before its counts converge.",
     "Pros: immune to the zero-frequency problem by construction. Cons: requires feature scaling and a held-out set for its many hyperparameters.",
     "Pros: coefficients map one-to-one onto causal effects. Cons: undefined for text data, where correlated tokens violate its core assumption fatally."],
    "Naive Bayes pros & cons",
    "Speed and frugality are the headline: closed-form counting means instant training, natural partial_fit streaming, and stability on data too small for anything flexible. The cost: a wrong-by-design independence assumption that wrecks calibration, and boundaries too simple for interaction-driven problems.",
    "The paradox worth remembering: the assumption is false nearly everywhere, yet the classifier works anyway — because classification only needs the argmax right, not the probabilities. That's also its trap: never feed NB confidences into cost calculations without recalibration.",
    "Cheap, fast, small-data-proof, confidently wrong about its own certainty — use the verdicts, recalibrate the confidence.");

  /* ===== Decision Trees ===== */

  g("trees1",
    "When is a single decision tree the right choice?",
    "When explainability is the binding requirement — the fitted rules can be printed, audited and challenged — and mixed-type tabular data with nonlinear thresholds needs capturing without preprocessing ceremony.",
    ["When maximum predictive accuracy is the goal, since a deep enough single tree reliably outperforms ensembles by fitting the training signal completely.",
     "When the relationship between features and target is smooth and gradual, which axis-aligned splits represent more faithfully than any linear model.",
     "When the dataset shifts frequently, because single trees are the most stable of all model families under small perturbations of the training rows.",
     "When features are heavily correlated, since impurity-based splitting shares credit evenly across correlated columns instead of picking one arbitrarily."],
    "When to use a decision tree",
    "A tree earns its place when a human must follow the logic: 'income < 20k AND months_employed < 6 → decline' is a model a committee can debate line by line. It also eats mixed types, missing-value strategies, and unscaled features without complaint — the lowest-ceremony model for messy tabular data.",
    "Know what you're NOT getting: accuracy (ensembles of trees beat single trees almost always), stability (small data changes can restructure the whole tree — the instability that bagging exploits), or smoothness (staircase approximations of gradual trends). Choose it for transparency, not leaderboards.",
    "The model you can print on one page and argue about in a meeting — that's its job, not winning benchmarks.");

  g("trees1",
    "What is the core limitation of a single decision tree?",
    "Instability and variance — a greedy split near the root, flipped by a few changed rows, restructures everything below it, so single trees overfit readily and generalise erratically.",
    ["Underfitting by construction: trees cannot represent interactions between features, since each split consults exactly one column at a time forever.",
     "Training cost — exhaustive split search is exponential in depth, so trees beyond five or six levels are computationally out of reach in practice.",
     "They only accept numeric inputs, so the categorical columns of business data must be dropped before a tree can be fitted at all.",
     "Their predictions vary smoothly and continuously with each feature, making them unable to model the sharp thresholds common in rules-based domains."],
    "Decision tree limitations",
    "• Overfits if max_depth / min_samples_leaf are not set — unpruned trees memorise\n• Greedy top-down splitting — locally best, never globally optimal\n• Unstable, high variance: a few changed rows rebuild the whole tree\n• Axis-aligned splits only — a diagonal boundary needs a staircase\n• Cannot extrapolate beyond the training range (piecewise-constant)\n• Impurity importances biased toward high-cardinality features\n• Imbalanced classes skew the splits",
    "Interactions are what stacked splits EXPRESS (split on A, then B within each branch — that's A×B structure); split search is polynomial and fast at practical depths; categorical handling is routine (natively or encoded); and predictions are piecewise-CONSTANT — sharp thresholds are their speciality, smoothness their failure.",
    "One nudged card near the base and the whole house rebuilds differently — that fragility is why forests were invented.");

  g("trees1",
    "Do decision trees need feature scaling?",
    "No — a split asks only whether a value clears a threshold, and thresholds live in each feature's own units; rescaling shifts the threshold with the data, leaving the tree identical.",
    ["Yes — impurity calculations compare values across features, so unscaled columns with larger ranges win a disproportionate share of the splits near the root.",
     "Yes when depth exceeds a few levels, since deep trees accumulate scale distortions multiplicatively at each successive split along a path.",
     "Only min-max scaling is required; standardisation actively harms trees by introducing the negative values that impurity measures cannot process.",
     "No, but only because modern libraries silently standardise inputs before growing the tree, so the invariance is an implementation courtesy rather than a property."],
    "Decision trees & scaling",
    "Fully scale-invariant (for monotone transforms): 'income > 30,000' and 'income_in_thousands > 30' are the same split. Impurity is computed from label proportions in the resulting groups — feature magnitudes never enter, so no feature 'wins' splits by being big. Log-transforming for a tree is likewise pointless (it's monotone).",
    "Impurity compares CANDIDATE SPLITS by how well they separate labels, not feature values across columns; no scale distortion accumulates with depth; negative values are unremarkable; and libraries do no hidden standardisation — the invariance is mathematical, one of trees' genuine conveniences.",
    "The tree asks 'above or below the bar?' — move the units and the bar moves with them, so nothing changes.");

  g("trees1",
    "What are the honest pros and cons of decision trees?",
    "Pros: readable rules, no scaling, mixed types, native interactions and nonlinearity. Cons: unstable, overfit-prone, stepwise predictions, no extrapolation — accuracy usually needs an ensemble.",
    ["Pros: the most stable model family under resampling and immune to overfitting at any depth. Cons: rules too complex for humans to audit and mandatory feature scaling.",
     "Pros: smooth continuous predictions and reliable extrapolation beyond training data. Cons: blind to interactions and restricted to numeric inputs only.",
     "Pros: convex training with a guaranteed globally optimal tree. Cons: probabilities so poor that no pruning or calibration step can make them usable.",
     "Pros: performance that improves monotonically with depth on held-out data. Cons: an inability to represent sharp thresholds, its most cited weakness."],
    "Decision tree pros & cons",
    "Everything convenient about trees (no preprocessing, readable structure, threshold logic, automatic interactions) survives into their ensembles — which is why the weaknesses (variance, overfitting) got solved by averaging MANY trees rather than abandoning the family. The single tree remains the explainability special.",
    "Training is greedy, not optimal (finding the best tree is NP-hard — greediness is the compromise); depth improves TRAINING fit monotonically while held-out accuracy peaks and falls; leaf-proportion probabilities are coarse but calibratable. The honest summary: brilliant representation, fragile fitting.",
    "All the convenience, none of the stability — keep one for the explanation, hire a forest for the accuracy.");

  /* ===== SVM ===== */

  g("svm1",
    "When is an SVM the right choice?",
    "Medium-sized datasets — up to tens of thousands of rows — where the boundary is complex, dimensions are high relative to samples, and a kernel can encode similarity you can't easily engineer as features.",
    ["Datasets with millions of rows, where the kernel trick's efficiency advantage over linear methods grows with every additional training example stored.",
     "Problems requiring probability estimates out of the box, since the margin distance converts directly into a calibrated class probability without extra fitting.",
     "Settings demanding rapid retraining on streams, because support vectors update incrementally as each new example arrives without touching the rest.",
     "Low-dimensional problems with abundant data, where its margin objective consistently beats tree ensembles that struggle in exactly that regime."],
    "When to use an SVM",
    "SVMs shine in the awkward middle: too complex for linear models, too little data for deep learning, especially when p is large relative to n (genomics, text with tailored kernels). The margin objective resists overfitting in high dimensions, and kernels let domain similarity (strings, graphs) enter directly.",
    "The n² kernel matrix is the scaling wall — tens of thousands of rows is the practical ceiling for nonlinear kernels (linear SVMs via LinearSVC scale much further). Probabilities need bolt-on Platt scaling; incremental updating isn't natural; and in low-dimensional data-rich regimes, boosted trees usually win.",
    "The specialist for hard boundaries on modest data — where the kernel is your way of telling it what 'similar' means.");

  g("svm1",
    "What is the core limitation of SVMs?",
    "Training scales roughly quadratically with rows for kernel SVMs — the kernel matrix is n×n — so beyond tens of thousands of samples, fitting and tuning become impractical.",
    ["The margin objective overfits catastrophically in high dimensions, which is why SVMs are avoided whenever features outnumber training examples.",
     "SVMs can only learn linear boundaries, and no mechanism exists for extending the formulation beyond dot products in the original feature space.",
     "Predictions require a full pass over the entire training set, since every training example contributes to every decision function evaluation.",
     "The optimisation is non-convex, so different random initialisations produce different support vectors and unstable decision boundaries."],
    "SVM limitations",
    "• Kernel matrix is n×n — training costs ~O(n²) memory and worse in time\n• Impractical past roughly tens of thousands of rows\n• Slow to tune: every C / gamma pair needs a full refit\n• Must scale features — the margin is a distance\n• No native probabilities — needs Platt scaling / calibration\n• Multi-class only via one-vs-rest or one-vs-one wrappers\n• Unreadable once kernelised; sensitive to heavy class overlap",
    "High dimensions are its STRENGTH (margins regularise there); kernels exist precisely to escape linearity; prediction touches only the SUPPORT vectors, not everyone (sparse solutions are the design's elegance); and the optimisation is convex — one global optimum, deterministically found. The limits are scale and ceremony, not instability.",
    "Beautiful mathematics with an n-squared price tag — the elegance stops fitting in memory around fifty thousand rows.");

  g("svm1",
    "Does an SVM need feature scaling?",
    "Yes, near-mandatory — the RBF kernel exponentiates squared distances and the margin is measured in feature units, so one unscaled column can flatten the kernel and dictate the boundary.",
    ["No — the kernel trick maps data into a space where original units are irrelevant, which is the entire reason kernels were introduced in the first place.",
     "Only for the linear kernel; RBF and polynomial kernels normalise their inputs internally as part of evaluating the kernel function itself.",
     "Only the target needs scaling for SVM regression; the feature columns enter through dot products whose scale conveniently cancels out.",
     "Scaling matters only for the intercept term, so centring the data is required but dividing by the standard deviation changes nothing."],
    "SVM & scaling",
    "The RBF kernel computes exp(−γ‖x−x'‖²): let one feature's range be 1000× the others' and the distance IS that feature — γ becomes impossible to tune (too big → everything dissimilar; too small → everything identical). Standardising is step zero of any SVM pipeline; skipping it is the most common cause of 'SVM performs terribly'.",
    "Kernels operate ON the raw distances/dot-products — they inherit scale problems, not launder them (nothing normalises internally). Centring alone doesn't fix range imbalance. This family and KNN sit together at the far end of scale sensitivity, opposite the trees.",
    "The kernel measures raw distance, and distance believes whichever feature shouts loudest — level the units first, always.");

  /* ===== round 2: the knob, the classic mistake, the rival — KNN ===== */

  g("medium",
    "Which KNN hyperparameter matters most, and what does it trade?",
    "k itself — small k gives jagged, noise-sensitive boundaries (low bias, high variance); large k gives smooth, majority-drift boundaries (high bias, low variance) — with the distance metric a close second.",
    ["The leaf_size of the k-d tree — it directly controls the bias-variance balance of the fitted model, with the number of neighbours being purely a speed setting.",
     "The training batch size — larger batches let KNN average away label noise during its fitting iterations, which is where most of its accuracy is decided.",
     "The learning rate — too high and the neighbour weights oscillate without converging, too low and the model needs many more epochs to stabilise.",
     "The number of estimators — KNN's accuracy comes from averaging many independently-seeded neighbour searches, so more searches mean smoother boundaries."],
    "KNN's key knob (k)",
    "k is the bias-variance dial in its purest form: k=1 memorises (every training point carves its own island, noise included), k=n predicts the global majority for everyone. Odd values dodge ties; sweep k on validation and the U-shaped error curve is the textbook picture. The metric (Euclidean vs Manhattan vs cosine) decides what 'near' even means — worth as much thought as k.",
    "KNN has no training loop, so batch size, learning rate and epochs are borrowed from the wrong families; leaf_size only affects search speed, never predictions. The two real decisions: how many neighbours vote, and which ruler measures nearness.",
    "One dial: how many neighbours get a vote — few voters memorise the noise, too many drown the locals in the national average.");

  g("medium",
    "What is the classic practical mistake with KNN?",
    "Forgetting to scale features (or leaving irrelevant columns in), so distances are dominated by units and noise — the model looks broken when the geometry was never meaningful.",
    ["Setting k to an odd number, which biases the vote toward the minority class and quietly degrades accuracy on every balanced dataset it touches.",
     "Using it on small datasets, where too few candidate neighbours exist for the voting mechanism to produce statistically stable answers at all.",
     "Standardising the features first, which erases the natural variance differences that KNN's distance computation depends on for its signal.",
     "Caching the training set in memory, which introduces stale-data bugs since KNN is designed to re-read its data from disk at every query."],
    "KNN's classic mistake",
    "The failure is silent: nothing errors, accuracy is just mysteriously poor, because 'nearest' was computed on one loud feature or twenty irrelevant ones. The fix costs two lines (StandardScaler in a pipeline; prune features first). Distance methods have no mechanism to down-weight junk columns — every column votes in the distance whether informative or not.",
    "Odd k is a tie-breaking virtue, not a bug; small data is KNN's comfort zone (big data is the problem); standardising is the CURE not the crime; and in-memory training data is simply how KNN works. The mistake that actually happens in practice is geometric neglect.",
    "The model did exactly what you asked: found the nearest points in a space where 'near' meant nothing.");

  g("medium",
    "When should you pick KNN over logistic regression?",
    "When the boundary is genuinely irregular, features are few and well-scaled, and you don't need probabilities or coefficients — KNN bends where logistic regression's single line can't.",
    ["When the dataset is wide and sparse, like text, where distances between documents are more informative than any weighted sum of their word counts could be.",
     "When you need the model to explain each decision to a regulator, since 'your five nearest neighbours voted' is the stronger legal explanation of the two.",
     "When deployment latency is critical, because KNN answers from a lookup while logistic regression must evaluate its full coefficient vector per request.",
     "When the training set is enormous, since KNN's per-query search cost shrinks as the dataset grows while logistic regression's stays constant."],
    "KNN vs logistic regression",
    "The real decision axis is boundary shape versus everything else. Logistic regression wins on speed, scale, probabilities, coefficients and wide sparse data (where distance concentrates but linear structure thrives). KNN's one advantage is expressiveness without engineering: if the classes interleave in curls a line can't follow — and your feature space is small and honest — the local vote wins.",
    "Text is logistic regression's home turf, not KNN's (high dimensions kill distance); neighbour votes explain less formally than coefficients; KNN is SLOWER at prediction, not faster; and its query cost GROWS with data. Pick KNN for shape, logreg for almost everything else.",
    "A line that's fast and explains itself, or a local vote that can follow any curl — choose by the shape of the truth.");

  /* ===== round 2 — Logistic Regression ===== */

  g("logreg1",
    "Which logistic regression hyperparameter matters most, and what does it trade?",
    "The regularisation strength C — small C shrinks coefficients hard (simpler, underfit risk), large C trusts the data (overfit risk on wide data) — plus the L1/L2 choice deciding whether weak features are zeroed or shrunk.",
    ["The number of trees — more of them smooths the ensemble's decision surface, at the cost of the linear interpretability the model is chosen for.",
     "The maximum depth — deeper logistic regressions capture higher-order interactions automatically, trading transparency for representational power.",
     "The kernel bandwidth gamma — it controls how far each training example's influence reaches, which is where over- and underfitting are decided.",
     "The perplexity — too low fragments the fitted probabilities into local clumps, too high blurs the classes into one indistinct mass."],
    "Logistic regression's key knob (C)",
    "C is inverse regularisation: the dial between 'trust the data' and 'stay humble'. On wide data (text, one-hots) it's the difference between a robust model and a memorising one. The penalty TYPE matters too: L1 produces sparse, feature-selecting models; L2 shares weight across correlated columns; elastic net mixes. Sweep C on a log scale — the answer is rarely the default.",
    "Trees, depth, kernels and perplexity belong to other families — logistic regression's whole hyperparameter surface is essentially penalty strength, penalty type, and (implicitly) which engineered features you offered it. That smallness is itself a selling point: little to tune, hard to get catastrophically wrong.",
    "One dial between humility and confidence — and a switch choosing whether weak features are silenced (L1) or merely quietened (L2).");

  g("logreg1",
    "What is the classic practical mistake with logistic regression?",
    "Reading coefficients as feature importance without standardising first, and comparing raw coefficient sizes across features measured in different units — the numbers reflect units as much as influence.",
    ["Using it for binary targets, which wastes the multinomial machinery it was actually designed for and biases the intercept toward the larger class.",
     "Applying regularisation, which is redundant for linear models since their limited capacity already prevents any meaningful overfitting from occurring.",
     "One-hot encoding categorical features, which the model cannot consume and which silently converts every category column into missing values.",
     "Checking calibration curves, which are meaningless for logistic outputs because the sigmoid guarantees perfect calibration by construction."],
    "Logistic regression's classic mistake",
    "A coefficient of 0.0001 on income-in-pounds and 0.5 on age-in-decades says nothing about which matters more — the units differ by orders of magnitude. Standardised inputs make coefficients comparable; odds-ratio interpretation (per standard deviation) makes them honest. The related sin: interpreting individually unstable coefficients when features are correlated.",
    "Binary is its home case; regularisation is near-essential on wide data (linear ≠ overfit-proof); one-hot encoding is exactly how categoricals ENTER the model; and calibration is good but not guaranteed (the sigmoid shapes outputs, it doesn't certify them) — checking remains worthwhile.",
    "The biggest number isn't the biggest influence — it might just be the smallest unit doing the shouting.");

  g("logreg1",
    "When should you pick logistic regression over a boosted tree ensemble?",
    "When calibration, coefficients, speed or auditability outrank a possible accuracy edge — and on wide sparse data or small samples, where the linear model often matches or beats the ensemble anyway.",
    ["When the data is dense, abundant and full of interactions, which is the regime where a single weighted sum systematically outperforms staged tree corrections.",
     "When features contain missing values, which boosted trees cannot process natively but the logistic likelihood integrates out during maximum likelihood fitting.",
     "When the target is imbalanced, since boosting has no reweighting mechanism while logistic regression handles skew automatically through its intercept.",
     "When retraining must happen monthly, because boosted ensembles cannot be refitted after their first deployment without invalidating earlier predictions."],
    "Logistic regression vs boosting",
    "Boosting usually wins raw accuracy on dense tabular data with interactions — that's its kingdom. Logistic regression takes the rematch when the problem is wide-and-sparse (text: linear wins routinely), samples are small (less to overfit), or the deployment demands what ensembles do badly: native calibration, sub-millisecond scoring, coefficients a committee can audit, trivially explainable adverse decisions.",
    "The other options invert reality: dense interaction-rich data favours boosting; XGBoost handles missing values NATIVELY while logistic regression needs imputation; boosting reweights (scale_pos_weight) while logreg's intercept does no automatic rebalancing; and both families retrain freely. The choice is accuracy-versus-operability, decided per problem.",
    "If the ensemble's extra point of AUC costs you the audit, the calibration and the millisecond — the straight line was the better deal.");

  /* ===== round 2 — Naive Bayes ===== */

  g("bayes1",
    "Which Naive Bayes hyperparameter matters most, and what does it trade?",
    "The smoothing constant alpha — too small and unseen feature-class pairs still zero out whole classes; too large and real frequency differences wash toward uniform — plus choosing the right variant for your data type.",
    ["The number of estimators — averaging many independently-fitted Bayes models is where the family's celebrated small-data robustness actually comes from.",
     "The maximum tree depth — shallow Bayes models underfit text while deep ones memorise it, making depth the central overfitting control in practice.",
     "The learning rate schedule — the class-conditional counts must be annealed slowly or the posterior oscillates and never settles on stable frequencies.",
     "The margin parameter C — it sets how heavily misclassified documents near the decision boundary are penalised during the iterative count refinement."],
    "Naive Bayes's key knob (alpha)",
    "Laplace/Lidstone smoothing is the one dial: alpha pretends every feature-class pair was seen alpha extra times, rescuing the model from the zero-frequency veto (one unseen word shouldn't erase a class). Small alpha trusts observed counts; large alpha flattens them. The bigger 'hyperparameter' is variant choice: Multinomial for counts, Bernoulli for presence/absence, Gaussian for continuous — mismatching variant to data type costs more than any alpha.",
    "No estimator counts, depths, learning rates or margins exist here — NB fits by counting, once. Its tuning surface is nearly empty, which is exactly why it's the one-afternoon baseline: alpha on a small grid, correct variant, done.",
    "One pinch of imaginary counts: too little and a single unseen word vetoes a class, too much and every word looks the same.");

  g("bayes1",
    "What is the classic practical mistake with Naive Bayes?",
    "Trusting its probability outputs — feeding the near-0-or-1 confidences into thresholds or cost decisions without recalibration, when correlation-driven double-counting made those numbers fiction.",
    ["Using it on text data, whose thousands of correlated token features violate the independence assumption too severely for the classifier to function at all.",
     "Applying Laplace smoothing, which biases every class-conditional estimate away from its true maximum-likelihood value and degrades accuracy measurably.",
     "Training it on small datasets, where per-class frequency estimates are too noisy to beat even a majority-class baseline in practice.",
     "Reporting its accuracy, which is misleading for generative models since only discriminative classifiers can be meaningfully scored on held-out labels."],
    "Naive Bayes's classic mistake",
    "NB's argmax is often right while its confidence is absurd — stacked correlated evidence pushes posteriors to 0.9999s that calibration curves expose as ~0.7s. Use the LABELS freely; before using the PROBABILITIES (cost thresholds, triage queues, risk reports), recalibrate with Platt or isotonic on held-out data. It's the family's one dangerous output.",
    "Text is where NB SHINES despite the violated assumption (the argmax survives); smoothing is protective, not corrupting; small data is its comfort zone; and held-out accuracy is meaningful for any classifier, generative or not. The real-world burn is always the same one: someone believed the 0.9999.",
    "Right verdicts, delusional certainty — ship the answers, never the confidence, until a calibrator has translated it.");

  g("bayes1",
    "When should you pick Naive Bayes over logistic regression?",
    "When training cost is the constraint — huge vocabularies, streaming updates, or tiny training sets — NB fits in one pass and updates by counting, where logistic regression must iterate.",
    ["When you need trustworthy probability estimates, since generative models produce better-calibrated posteriors than any discriminative alternative can.",
     "When features are strongly correlated, because the factorised likelihood averages correlated evidence where logistic regression double-counts it badly.",
     "When accuracy on large datasets is paramount, as the independence assumption becomes an advantage precisely where data is most abundant.",
     "When the decision boundary is nonlinear, since multiplying likelihoods composes curves that a weighted sum of features cannot represent."],
    "Naive Bayes vs logistic regression",
    "They're siblings (NB is the generative counterpart of discriminative logreg), and the classic result says: NB reaches its (worse) asymptote FASTER — winning on very small data — while logreg wins as data grows, and handles correlation properly by learning joint weights. NB's remaining edges are operational: one-pass fitting, trivial partial_fit streaming, and zero tuning.",
    "Calibration runs the OTHER way (logreg honest, NB extreme); correlation is NB's weakness, logreg's strength (weights adjust jointly); abundance favours logreg; and both draw linear boundaries in log-space — nonlinearity is neither one's advantage. Pick NB for speed and scarcity, logreg for everything the extra fitting time buys.",
    "The counting cousin wins when data is scarce or the vocabulary is vast and flowing — the fitting cousin wins once there's enough data to learn the correlations.");

  /* ===== round 2 — Decision Trees ===== */

  g("trees1",
    "Which decision tree hyperparameter matters most, and what does it trade?",
    "The depth/leaf-size family — max_depth, min_samples_leaf, ccp_alpha — one complexity brake is essential: unlimited depth memorises, heavy limits underfit; min_samples_leaf is often the most robust single choice.",
    ["The learning rate — deep trees must be grown slowly, with each level's splits damped, or the early levels dominate and the tree never recovers from them.",
     "The number of neighbours consulted at each split, which controls how local the impurity estimate is and thereby the tree's whole bias-variance balance.",
     "The kernel choice — an RBF-split tree bends around curved class boundaries where the default linear-split tree can only staircase across them.",
     "The bootstrap fraction — trees are fitted on resampled data by default, and the resample size is what separates overfitting from underfitting."],
    "Decision tree's key knob (depth/leaves)",
    "An unconstrained tree grows until leaves are pure — on noisy data that's memorisation with a diagram. All the important knobs are one brake in different places: cap the depth, require min_samples_leaf rows per leaf (blocks the one-row leaf that IS overfitting), or grow-then-prune with cost-complexity (ccp_alpha). Tune one properly rather than three casually.",
    "No learning rates (nothing iterates), no neighbours, no kernels (splits are axis-aligned thresholds), and no bootstrap in a SINGLE tree (that's bagging/forests). The tree's tuning question is singular: how much complexity may it spend on this data's noise?",
    "One brake pedal with three positions — depth, leaf size, or prune-after — press at least one, or the tree memorises the training set verbatim.");

  g("trees1",
    "What is the classic practical mistake with decision trees?",
    "Growing to default unlimited depth, reading the training accuracy (≈100%), and trusting the resulting tree — including treating its top splits and importances as insight when they may be noise artefacts.",
    ["Pruning the tree, which removes the deep branches where most of the generalisable signal lives and reliably harms held-out accuracy on real data.",
     "One-hot encoding categoricals, which trees cannot split on, silently reducing every encoded column to an unused constant in the fitted model.",
     "Using them on tabular data, where their threshold logic is structurally mismatched and distance-based methods are known to dominate them.",
     "Setting a random_state, which restricts the split search space and produces systematically shallower trees than unseeded runs would find."],
    "Decision tree's classic mistake",
    "sklearn's DecisionTreeClassifier defaults to unlimited depth: it WILL reach ~100% training accuracy, and the 15-level tree it grows is part signal, part memorised noise — including plausible-looking splits that don't replicate. The habit: always constrain or prune, always read HELD-OUT accuracy, and distrust deep-tree 'insights' that a resample would restructure.",
    "Pruning is the remedy, not the mistake; one-hot columns split fine (threshold 0.5); tabular data is trees' home field; and random_state only breaks ties reproducibly. The trap is the seductive default: a model that aces training and narrates a convincing, partly fictional story about your data.",
    "It aced the training set and drew you a beautiful diagram of the noise — cap it, prune it, and grade it on unseen data.");

  g("trees1",
    "When should you pick a single tree over a random forest?",
    "When the model must BE the explanation — a printable, auditable rule set — or when deployment is radically constrained; on raw accuracy, expect to pay for that transparency versus the forest.",
    ["When accuracy is paramount, since a well-pruned single tree generalises better than a forest whose bootstrap noise contaminates every constituent vote.",
     "When the dataset is small, because forests need thousands of rows per tree while a single tree extracts more signal from limited data on its own.",
     "When features are correlated, which breaks the forest's decorrelation mechanism but leaves an individual tree's greedy splits entirely unaffected.",
     "When training time is unlimited, since single trees are slower to fit than forests but produce better-calibrated probability estimates when given time."],
    "Single tree vs random forest",
    "The forest wins accuracy almost always — averaging decorrelated trees erases the variance that plagues singles. What it costs is the story: 500 voting trees explain via importance scores and SHAP, not via a rule a person can follow. Choose the single tree when the explanation IS the deliverable (credit rules, medical triage protocols, policy documents) or when the runtime must be microscopic.",
    "The bootstrap 'noise' is the forest's MECHANISM, not contamination; small data favours the variance-reducing forest if anything; correlated features hurt both about equally; and singles train FASTER, not slower. The honest framing: you trade measurable accuracy for a model that fits on one page — sometimes exactly the right trade.",
    "Five hundred experts vote better than one — but only the one can stand up and read out his reasoning.");

  /* ===== round 2 — SVM ===== */

  g("svm1",
    "Which SVM hyperparameters matter most, and what do they trade?",
    "C and gamma, tuned TOGETHER — C prices margin violations (soft vs hard boundaries), gamma sets the RBF kernel's reach (local spikes vs global smoothness) — and the two compensate for each other, so grid-search jointly on log scales.",
    ["The number of support vectors — set directly by the user, it fixes model sparsity in advance, with the optimiser then choosing the best points for the budget.",
     "The tree depth of the decision surface — deeper surfaces bend around more islands of each class, at the usual cost of memorising the training data.",
     "The number of boosting rounds — each round adds one more support vector to the ensemble, so rounds control both capacity and training time linearly.",
     "The learning rate and momentum — as with neural networks, most SVM failures are optimisation failures caused by badly-scheduled gradient steps."],
    "SVM's key knobs (C and gamma)",
    "C answers 'how expensive is a training point inside the margin?' (high C: contorted boundary chasing every point; low C: wide tolerant margin). Gamma answers 'how far does one example's influence reach?' (high: tight islands around points; low: near-linear smoothness). They interact — a high-gamma overfit can be partly masked by low C — hence the standard log-scale joint grid, never one-at-a-time.",
    "Support vectors are DISCOVERED by the convex optimisation, not budgeted; no trees or rounds exist here; and the QP solver has no learning-rate pathologies — with scaled features, SVM failures are almost always C-gamma failures, which is why that grid is the whole tuning story.",
    "Two dials: the price of breaking the margin, and the reach of each example's vote — turned together, never alone.");

  g("svm1",
    "What is the classic practical mistake with SVMs?",
    "Running an RBF SVM on unscaled features with default C and gamma, getting mediocre accuracy, and concluding 'SVMs don't work on this data' — when the geometry was broken before the model ever ran.",
    ["Standardising the features first, which destroys the raw distance information the kernel needs and reliably costs several points of accuracy.",
     "Using the linear kernel on text data, a known anti-pattern since documents require the RBF kernel's curvature to separate topics properly.",
     "Tuning C and gamma on a validation set, which overfits the kernel to that split — defaults were chosen to be optimal across all datasets.",
     "Requesting probability estimates, which silently disables the margin maximisation and turns the SVM into an ordinary logistic regression."],
    "SVM's classic mistake",
    "The RBF kernel's distances are unit-weighted, and defaults assume standardised inputs — unscaled data makes gamma effectively untunable and the margin meaningless. The pattern repeats in countless abandoned experiments: scale first (pipeline it), THEN grid C×gamma, and the 'broken' SVM often becomes competitive. Diagnosis before dismissal.",
    "Standardising is the fix, not the sin; linear kernels are the STANDARD for text (high-dimensional sparse data is often linearly separable); validation tuning is simply correct methodology; and probability=True bolts Platt scaling on top without touching the margin objective. The classic burn is always the unscaled default run.",
    "Nine of ten 'SVMs are useless' verdicts were really 'we never scaled the features and never moved the two dials'.");

  g("svm1",
    "When should you pick an SVM over a boosted tree ensemble?",
    "When dimensions are high relative to samples, or when a domain kernel (strings, graphs, custom similarity) encodes structure trees can't see — margins regularise where boosting's flexibility overfits.",
    ["When the dataset is large, dense and low-dimensional, which is the regime where kernel evaluations become cheap and tree ensembles struggle most.",
     "When features have wildly mixed types and scales with many missing values, conditions the SVM handles natively and boosting cannot tolerate.",
     "When per-feature explanations are contractually required, since support vectors provide clearer attribution than any tree-based importance measure.",
     "When training compute is scarce, because the quadratic programme solves in a fraction of the time that gradient boosting's many rounds consume."],
    "SVM vs boosting",
    "Boosting owns dense mixed-type tabular data — but its flexibility needs data to discipline it. When p is large and n modest (bioinformatics, specialised text), the SVM's margin is built-in restraint and often wins. And kernels are its unique door: a string kernel or graph kernel injects domain structure that no tree split can express.",
    "The other claims run backwards: large-n is where kernel SVMs DIE (n² matrix); mixed types, scales and missing values are boosting's native comforts and SVM's chores; support vectors explain little (they're just the boundary-defining points); and the QP is far slower than a boosting run at scale. Pick the SVM for high-p/low-n and kernelisable structure.",
    "When your data is wide, scarce, or 'similar' means something only you can define — the margin and the kernel earn their ceremony.");

  g("svm1",
    "What are the honest pros and cons of SVMs?",
    "Pros: strong in high dimensions, convex training, kernels for custom similarity, sparse support-vector solutions. Cons: poor scaling with rows, mandatory feature scaling, awkward probabilities, fiddly tuning.",
    ["Pros: near-linear scaling to millions of rows and native calibrated probabilities. Cons: non-convex training and weakness in high-dimensional feature spaces.",
     "Pros: no hyperparameters to tune and boundaries readable as if-then rules. Cons: restriction to linearly separable problems and dense solutions using every point.",
     "Pros: immunity to feature scaling and instant retraining on streaming data. Cons: inability to use custom kernels beyond the built-in polynomial family.",
     "Pros: graceful degradation on huge datasets and automatic feature selection. Cons: convexity, which prevents the model from fitting complex boundaries."],
    "SVM pros & cons",
    "The pro column is mathematical: a convex objective (one optimum, reproducible), margins that regularise naturally where features outnumber samples, kernels as a principled door for domain knowledge, and solutions carried by a fraction of the data. The con column is operational: n² scaling, scale-sensitivity, Platt-scaled probabilities, and a C-gamma grid that must be searched.",
    "A once-dominant family now occupying a niche: boosted trees took the tabular crown and deep nets the perceptual one, but for medium-sized high-dimensional problems with meaningful similarity structure, the SVM remains the tool the theory says it is.",
    "Convex elegance and kernel flexibility, paid for in scaling walls and tuning ceremony — a specialist now, not the default.");

})();
