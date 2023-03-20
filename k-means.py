import numpy as np
import matplotlib.pyplot as plt
import random
import cv2

random.seed(0)
np.random.seed(0)
def get_initial_centroids(X, k):
    number_of_samples = X.shape[0] # number of samples
    sample_points_ids=random.sample(range(0,number_of_samples),k) # get random sample points
    centroids = list(set([tuple(X[id]) for id in sample_points_ids])) # get random centroids
    # now check if the number of centroids is equal to k
    while len(centroids) < k:
        # if not, then add more centroids
        centroids.extend(get_initial_centroids(X, k-len(centroids)))
    # return the centroids
    return np.array(centroids)
def get_eculidean_distance(A, B):
    """
    Function computes euclidean distance between matrix A and B.
    E. g. C[2,15] is distance between point 2 from A (A[2]) matrix and point 15 from matrix B (B[15])
    Args:
        A_matrix (numpy.ndarray): Matrix size N1:D
        B_matrix (numpy.ndarray): Matrix size N2:D
    Returns:
        numpy.ndarray: Matrix size N1:N2
    """
    A_squre=np.reshape(np.sum(A*A,axis=1),(A.shape[0],1))
    B_squre=np.reshape(np.sum(B*B,axis=1),(1,B.shape[0]))
    AB=np.dot(A,B.T)
    return np.sqrt(A_squre+B_squre-2*AB)
def get_clusters(X, centroids,distance_measuring_function):
    """
    Function computes closest centroids for each sample point in X
    Args:
        X (numpy.ndarray): Matrix size N:D
        centroids (numpy.ndarray): Matrix size K:D
    Returns:
        numpy.ndarray: Matrix size N:1
    """
    distances = distance_measuring_function(X, centroids) # compute distances
    closest_centroids = np.argmin(distances, axis=1) # get closest centroids
    clusters =[[] for i in range(centroids.shape[0])] # create empty clusters
    for i,cluster_id in enumerate(closest_centroids): # for each sample point
        clusters[cluster_id].append(X[i]) # add sample point to cluster X[i] = sample point and cluster_id is cluster id
    return clusters
def has_converged(old_centroids, new_centroids, distance_measuring_function, threshold=0.0001):
    """
    Function checks if the centroids has converged
    Args:
        old_centroids (numpy.ndarray): Matrix size K:D
        new_centroids (numpy.ndarray): Matrix size K:D
    Returns:
        bool: True if converged, False otherwise
    """
    distances = distance_measuring_function(old_centroids, new_centroids) # compute distances
    return np.all(distances < threshold) # check if all distances are smaller than threshold
def perform_k_means_algo(X,k,distance_measuring_method,thershold=0.00001):
    initial_centriods=get_initial_centroids(X,k) # get initial centroids
    old_centroids=initial_centriods # set old centroids to initial centroids
    centriods_covered=False # set centroids covered to false
    while not centriods_covered: # while centroids are not covered
        clusters=get_clusters(X,old_centroids,distance_measuring_method) # get clusters
        new_centroids=np.array([np.mean(cluster,axis=0) for cluster in clusters]) # compute new centroids
        centriods_covered=has_converged(old_centroids,new_centroids,distance_measuring_method,thershold) # check if centroids has converged
        old_centroids=new_centroids # set old centroids to new centroids
    return new_centroids
def get_reduced_image(image,number_of_colors):
    h,w,d=image.shape # get image shape
    X=np.reshape(image,(h*w,d)) # reshape image to 2D array
    X=np.array(X,dtype=np.float64)/255 # normalize image
    centroids=perform_k_means_algo(X,number_of_colors,get_eculidean_distance) # perform k-means clustering
    distance_matrix=get_eculidean_distance(X,centroids) # compute distance matrix
    closest_centroids=np.argmin(distance_matrix,axis=1) # get closest centroids
    X_recovered=centroids[closest_centroids] # get recovered image
    X_recovered=np.reshape(X_recovered,(h,w,d)) # reshape recovered image
    X_recovered=np.array(255*X_recovered,dtype=np.uint8) # denormalize imag
    reduced_image=np.reshape(X_recovered,(h,w,d)) # reshape image
    return reduced_image
def main():
    k_values=[2,4,8,16,32,64,128,256] # k values
    image=cv2.imread("IMG.jpg") # read image
    # check if image is not None
    if image is None:
        print("Image not found")
        return
    for k in k_values: # for each k value
        reduced_image=get_reduced_image(image,k) # get reduced image
        cv2.imshow("reduced image",reduced_image) # show reduced image
        cv2.waitKey(0) # wait for key press
    cv2.destroyAllWindows() # destroy all windows

if __name__ == "__main__":
    main()
