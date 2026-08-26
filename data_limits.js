/* Model limitations — one card per model, every one a Level 1 (Foundations) definition,
   and every one written as short bullet points so the weaknesses can be scanned and
   recalled in a few seconds rather than read as prose.

   This file is the single authority for the limitations cards:
     - it ADDS the limitations card for every model that didn't already have one, and
     - it RANKS every limitations card (old and new) at level 1.
   It therefore loads LAST — after data_model_guide.js and data_defs_rank.js — so its
   ranks win. Questions PUSH onto existing Part I arrays, which already exist by now.
   choices[0] is always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function bul(items) { return items.map(function (s) { return '• ' + s; }).join('\n'); }

  /* qk: the topic's Part I question key. name: the concept (flashcard front).
     items: the short bullets (flashcard back). */
  function lim(qk, q, correct, distractors, name, items, explain, simple) {
    (Q[qk] = Q[qk] || []).push({
      q: q, choices: [correct].concat(distractors), explain: explain, simple: simple,
      widget: { reveal: { name: name, text: bul(items) } }
    });
    D[q] = 1;
  }

  /* ===== Gradient Boosting ===== */

  lim("gb1",
    "What are the main limitations of gradient boosting?",
    "It overfits if boosted too long, trains sequentially so trees can't be parallelised, and hides a large, interacting set of hyperparameters.",
    ["It cannot fit non-linear relationships, because each additional tree is constrained to correct the previous one along a straight line.",
     "It requires carefully scaled features, since the gradient step size is computed in the raw units of every input column.",
     "It only works for binary classification, as the additive residual formulation has no defined form for regression targets.",
     "It is immune to noisy labels but cannot handle missing values, so every gap must be imputed before the first round begins."],
    "Gradient boosting limitations",
    ["Overfits if you boost too many rounds — needs early stopping on a validation set",
     "Sequential by design: rounds can't be parallelised the way a forest's trees can",
     "Many interacting knobs: learning rate, n_estimators, depth, subsample, regularisation",
     "Chases the errors, so noisy labels and outliers hurt it badly",
     "Not interpretable as a whole — needs SHAP or partial dependence",
     "Like all tree models, it cannot extrapolate beyond the training range",
     "Slower to train than a random forest for the same number of trees"],
    "The U-curve over rounds is the signature failure: test error falls, bottoms out, then climbs as later trees fit noise. Boosting handles non-linearity superbly (that's the point of stacked trees), needs no scaling, and does regression and multiclass fine — its real bill is tuning time, sequential training and noise sensitivity.",
    "Powerful, fiddly and impatient with noise — it will happily keep fitting your errors until you tell it to stop.");

  /* ===== XGBoost ===== */

  lim("xgb1",
    "What are the main limitations of XGBoost?",
    "A large hyperparameter surface to tune, real overfitting risk on noisy data despite regularisation, heavy memory use, and no meaningful interpretability or extrapolation.",
    ["It cannot handle missing values, so every gap must be imputed before training, unlike scikit-learn's own tree implementations.",
     "It is limited to small datasets, since the exact split-finding algorithm is the only one available and scales exponentially with rows.",
     "It supports only squared-error loss, which makes it unsuitable for classification problems of any kind.",
     "It requires one-hot encoding and feature scaling, because the histogram binning step assumes standardised inputs."],
    "XGBoost limitations",
    ["Large hyperparameter surface — tuning is the real cost of using it",
     "Still overfits noisy or small data despite lambda/alpha; early stopping is not optional",
     "Memory-hungry when deep and wide; histogram binning trades a little accuracy for speed",
     "A black box — explanations need SHAP, not the model itself",
     "No extrapolation: predictions are capped by the training range",
     "An extra dependency with its own API and versioning outside sklearn core",
     "Wrong tool for tiny data, images, raw text or sequences"],
    "Missing values are handled natively (it learns a default direction per split), the approx/hist algorithms exist precisely for large data, it ships many objectives including logistic and multiclass, and trees need no scaling. The honest costs are tuning effort, memory, opacity and the fact that regularisation reduces overfitting without abolishing it.",
    "The tabular champion, and a knob-covered black box: brilliant when tuned, expensive to tune, and never able to predict past what it saw.");

  /* ===== Stacking & Voting ===== */

  lim("stack1",
    "What are the main limitations of stacking and voting ensembles?",
    "You pay to train and serve every base model, out-of-fold predictions are mandatory or the meta-learner leaks, and the gain over the best single model is often tiny.",
    ["They can only combine models of the same family, so a forest and a logistic regression cannot appear in the same ensemble.",
     "They require the base models to be perfectly correlated, since disagreement between them makes the meta-learner unidentifiable.",
     "They reduce bias but always increase variance, which is why they overfit more than any single base model by construction.",
     "They cannot output probabilities, so soft voting and calibrated stacking are theoretically impossible to implement."],
    "Stacking & voting limitations",
    ["Cost multiplies — every base model must be trained, tuned, served and monitored",
     "Needs out-of-fold predictions to train the meta-model, or it leaks and overfits",
     "Correlated base models add almost nothing — diversity is the whole point",
     "Hard to interpret and hard to debug when one member goes wrong",
     "Gains are usually marginal over the best-tuned single model",
     "More moving parts to version and retrain in production",
     "Soft voting needs the base probabilities to be calibrated to be meaningful"],
    "Mixing model families is the whole idea (that's where diversity comes from), and the point of averaging is to CUT variance. Ensembles do output probabilities. The genuine limits are operational: compute, latency, leakage risk in the meta-training step, opacity, and a payoff measured in fractions of a point.",
    "A committee of experts: usually a bit better than its best member, and always far more expensive to keep in the room.");

  /* ===== K-Means ===== */

  lim("kmeans1",
    "What are the main limitations of K-Means?",
    "You must pick k in advance, it assumes round, similar-sized clusters, it is pulled around by outliers, and it only ever reaches a local optimum.",
    ["It cannot be applied to numeric data, because centroids are only defined for categorical variables and their modes.",
     "It requires labelled examples for at least one cluster, which makes it a semi-supervised rather than an unsupervised method.",
     "It always finds the globally optimal clustering, but only if the number of features exceeds the number of samples.",
     "It is invariant to feature scale, so standardising the inputs before fitting changes nothing about the resulting clusters."],
    "K-Means limitations",
    ["You must choose k in advance — elbow and silhouette only hint at it",
     "Assumes round (spherical), similar-sized, similar-density clusters",
     "Sensitive to initialisation — needs k-means++ and multiple restarts",
     "Outliers drag centroids, because a centroid is a mean",
     "Must scale features first; it only knows Euclidean distance",
     "Every point is forced into a cluster — there is no noise label",
     "Converges to a local optimum, never guaranteed the global one"],
    "K-Means is numeric-only and unsupervised, it never guarantees the global optimum (that's why n_init exists), and it is acutely scale-sensitive — an unscaled large-range column decides the clustering on its own. Its real weaknesses are the mandatory k, the spherical assumption and the mean's fragility to outliers.",
    "Fast, simple and opinionated: it will find k round blobs whether or not your data has any.");

  /* ===== Hierarchical Clustering ===== */

  lim("hier1",
    "What are the main limitations of hierarchical clustering?",
    "Quadratic memory and near-cubic time make it impractical at scale, and its merges are greedy and irreversible, so an early mistake is permanent.",
    ["It requires the number of clusters to be fixed before fitting, since the dendrogram cannot be cut after the merges are complete.",
     "It can only be used with Euclidean distance, so text and categorical similarity measures are ruled out entirely.",
     "It is the fastest clustering algorithm on large datasets, but its results depend on the random seed used to initialise the merges.",
     "It produces different results on every run, because the pair chosen for each merge is sampled at random from the closest candidates."],
    "Hierarchical clustering limitations",
    ["O(n²) memory for the distance matrix — a few thousand points is the practical ceiling",
     "Naive implementations are ~O(n³) in time",
     "Merges are greedy and irreversible — one bad merge is never undone",
     "You still have to choose where to cut the dendrogram",
     "Linkage choice changes the answer (single-link chains, complete-link splits clusters)",
     "Sensitive to feature scaling, distance metric and outliers",
     "No noise label, and the dendrogram is unreadable once n is large"],
    "It's the opposite of the distractors: the dendrogram lets you choose k AFTER fitting, it works with any distance metric, it's deterministic (no seed), and it is one of the SLOWEST clusterers. Its costs are memory, time and the permanence of every greedy merge.",
    "It draws you the whole family tree — but only for a small family, and it never takes a merge back.");

  /* ===== DBSCAN ===== */

  lim("dbscan1",
    "What are the main limitations of DBSCAN?",
    "eps and min_samples are coupled and hard to choose, and a single eps cannot describe clusters that differ in density.",
    ["It requires the number of clusters as an input, which defeats its stated purpose of discovering structure automatically.",
     "It cannot label any point as noise, so every outlier is forced into the nearest cluster regardless of distance.",
     "It only finds spherical clusters, which makes it strictly less flexible than K-Means on non-convex shapes.",
     "It scales linearly to millions of dimensions, but fails whenever the dataset contains fewer than a thousand rows."],
    "DBSCAN limitations",
    ["Two coupled parameters, eps and min_samples — and eps is genuinely hard to pick",
     "Varying-density clusters defeat it: one eps cannot fit them all",
     "Degrades in high dimensions as distances concentrate",
     "Must scale features — eps is a raw distance",
     "Border points can change cluster depending on processing order",
     "No control over the number of clusters; can label much of the data as noise",
     "No predict() for new points — it clusters the data it was given"],
    "Finding the cluster count itself, labelling noise and handling arbitrary shapes are DBSCAN's three headline STRENGTHS, not limits. Its real weaknesses are parameter sensitivity, the single global density threshold, high-dimensional distance concentration, and having no model to apply to new points.",
    "It finds crowds of any shape and calls the stragglers noise — as long as every crowd is packed to the same density.");

  /* ===== PCA ===== */

  lim("pca1",
    "What are the main limitations of PCA?",
    "It is a linear method, so curved structure is missed, and its components are mixtures of every original feature, which costs interpretability.",
    ["It cannot reduce the number of dimensions, only rotate them, so the data always keeps its original column count.",
     "It requires labelled data, because components are chosen to maximise the separation between the target classes.",
     "It is unaffected by feature scaling, so standardising before fitting never changes which components are found.",
     "It always discards the components carrying the most variance, keeping only the low-variance directions as denoised features."],
    "PCA limitations",
    ["Linear only — curved manifolds are flattened wrongly (use kernel PCA / UMAP)",
     "Components are weighted mixtures of every feature, so interpretability drops",
     "Must standardise first, or the largest-unit column dominates the components",
     "Variance ≠ usefulness: a dropped low-variance direction may hold the signal",
     "Sensitive to outliers, which inflate variance in their own direction",
     "Poor fit for sparse or categorical data (try TruncatedSVD / MCA)",
     "How many components to keep is a judgement call"],
    "PCA does reduce dimensions (you keep the top components), it is unsupervised (it never sees the target — that's LDA's job), it is extremely scale-sensitive, and it keeps the HIGH-variance directions. Its honest limits are linearity, the loss of readable features and the assumption that variance means information.",
    "It keeps the widest directions — which is only the right move when wide means important.");

  /* ===== t-SNE ===== */

  lim("tsne1",
    "What are the main limitations of t-SNE?",
    "It is a visualisation, not a transform: cluster sizes and the gaps between clusters carry no meaning, the map changes with perplexity and seed, and there is nothing to apply to new points.",
    ["It preserves global distances exactly, which makes the axes directly interpretable as units of the original features.",
     "It is a deterministic linear projection, so two runs on the same data always produce the identical map.",
     "It scales effortlessly to millions of points, but is restricted to datasets with fewer than ten original features.",
     "It requires class labels to position the points, which makes it unusable for genuinely unsupervised exploration."],
    "t-SNE limitations",
    ["Visualisation only — no transform for new points, no features for a model",
     "Cluster sizes and between-cluster distances are not meaningful",
     "Perplexity changes the picture; a different seed gives a different map",
     "Non-convex optimisation — every run lands in a different local optimum",
     "Slow: ~O(n²) naively; Barnes-Hut and subsampling are usually required",
     "Preserves local neighbourhoods at the expense of global structure",
     "Easy to over-read: apparent clusters can be pure artefact"],
    "Every distractor inverts a real property: t-SNE deliberately sacrifices GLOBAL distances, it is stochastic and non-linear, it is slow on large n while handling high-dimensional inputs happily, and it is fully unsupervised. Read it as a neighbourhood map, never as a measurement.",
    "A beautiful map with no scale bar: trust who sits near whom, never how big or how far apart.");

  /* ===== Linear Regression ===== */

  lim("regr",
    "What are the main limitations of linear regression?",
    "It assumes a straight-line relationship with independent, constant-variance errors, it is dragged by outliers and destabilised by correlated features, and it extrapolates with unearned confidence.",
    ["It can only predict categorical outcomes, so continuous targets require logistic regression instead.",
     "Its coefficients are uninterpretable, which is why it is treated as a black-box model in regulated settings.",
     "It cannot be fitted when the number of rows exceeds the number of features, since the normal equations become singular.",
     "It is robust to outliers by construction, because squaring the errors reduces the influence of extreme observations."],
    "Linear regression limitations",
    ["Assumes a straight-line relationship — curvature must be engineered in",
     "Squared error means outliers pull the line hard",
     "Multicollinearity makes coefficients unstable and impossible to read",
     "Assumes independent errors with constant variance (homoscedasticity)",
     "No interactions unless you add them explicitly",
     "Breaks down when p > n without regularisation (ridge / lasso)",
     "Extrapolates confidently outside the training range — and coefficients are not causal"],
    "It predicts continuous numbers (logistic is the classification sibling), its coefficients are the benchmark for interpretability, and it is singular when features outnumber ROWS, not the reverse. Squaring errors AMPLIFIES outliers rather than damping them — that's why robust and regularised variants exist.",
    "The most readable model there is, and the most confident about places it has never been.");

  /* ===== Every limitations card is Level 1 — Foundations =====
     The reveal names below are the concept fronts of the cards above plus the
     limitations cards already defined in data_model_guide.js and data_moredefs_g13.js.
     This file loads after data_defs_rank.js, so these ranks are the final word. */
  ["KNN limitations", "Logistic regression limitations", "Naive Bayes limitations",
   "Decision tree limitations", "SVM limitations", "Forest limitations",
   "Gradient boosting limitations", "XGBoost limitations", "Stacking & voting limitations",
   "K-Means limitations", "Hierarchical clustering limitations", "DBSCAN limitations",
   "PCA limitations", "t-SNE limitations", "Linear regression limitations"
  ].forEach(function (n) { R[nk(n)] = 1; });
})();
