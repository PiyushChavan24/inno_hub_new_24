"""TF-IDF + Cosine Similarity implementation for small corpus."""
import math, re
from collections import Counter, defaultdict

def tokenize(s):
    if not s: return []
    s = s.lower()
    s = re.sub(r'[^a-z0-9\s]', ' ', s)
    tokens = [t for t in s.split() if t]
    return tokens

def tf(tokens):
    return Counter(tokens)

def idf(docs_tokens):
    N = len(docs_tokens)
    df = defaultdict(int)
    for tokens in docs_tokens:
        seen = set()
        for t in tokens:
            if t not in seen:
                df[t] += 1
                seen.add(t)
    idf = {}
    for term, count in df.items():
        idf[term] = math.log((N+1)/(count+1)) + 1.0
    return idf

def to_vec(tf_counter, idf_map, vocab):
    vec = [ (tf_counter.get(t,0) * idf_map.get(t,1.0)) for t in vocab ]
    return vec

def dot(a,b):
    return sum(x*y for x,y in zip(a,b))

def norm(a):
    return math.sqrt(sum(x*x for x in a))

def cosine_similarity(a,b):
    na = norm(a); nb = norm(b)
    if na==0 or nb==0: return 0.0
    return dot(a,b)/(na*nb)

def get_snippets(textA, textB, min_len=30):
    snippets = []
    if not textA or not textB: return snippets
    A = textA.lower(); B = textB.lower()
    # naive substring search for sentences present in both
    sentences = [s.strip() for s in re.split(r'[\.\n]', textA) if len(s.strip())>=min_len]
    for s in sentences:
        if s.lower()[:20] and s.lower() in B:
            snippets.append(s.strip())
            if len(snippets)>=5: break
    return snippets

def compare_with_corpus(target, others):
    # target: {id, text}, others: [{id, text}, ...]
    docs = [target] + others
    docs_tokens = [tokenize(d['text']) for d in docs]
    idf_map = idf(docs_tokens)
    vocab = list(idf_map.keys())
    tfs = [tf(tokens) for tokens in docs_tokens]
    vecs = [ to_vec(tfs[i], idf_map, vocab) for i in range(len(tfs)) ]
    target_vec = vecs[0]
    results = []
    highest = 0.0
    for i in range(1, len(vecs)):
        sim = cosine_similarity(target_vec, vecs[i])
        percent = round(sim * 100, 2)
        if percent > highest: highest = percent
        snippets = get_snippets(target['text'], others[i-1]['text'])
        results.append({'projectId': others[i-1]['id'], 'similarity': percent, 'snippets': snippets})
    return {'results': results, 'highest': highest}
