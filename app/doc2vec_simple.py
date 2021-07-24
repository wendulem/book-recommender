from gensim.similarities.annoy import AnnoyIndexer
from gensim.models.doc2vec import Doc2Vec
import pandas as pd

def doc2vec_simple_list(array_of_titles, n):
    # load the model that was already trained
    model = Doc2Vec.load('doc2vec.model')

    # uses spotify's annoy algorithm to find the approximate closest vector
    indexer = AnnoyIndexer(model, 5)
    vectors = []
    for title in array_of_titles:
        print(title)
        vectors.append(model.dv[title])

    most_similar_titles = model.dv.most_similar(vectors, topn=n, indexer=indexer)
    print(most_similar_titles)
    # load the file as a dataframe
    df = pd.read_csv('book_desc_fixed2.csv')

    # use the titles produced by the doc2vec model to get the descriptions from the csv file
    recommendations = {}
    for element in most_similar_titles:
        if not element[0] in array_of_titles:
            title = element[0] + " (" + str(round(element[1] * 100, 2)) + "%)"
            desc = df[df['title'] == element[0]]['description'].iloc[0]
            recommendations[title] = desc

    return recommendations

if __name__ == "__main__":
    print(doc2vec_simple_list(['Animal Farm'], 5))