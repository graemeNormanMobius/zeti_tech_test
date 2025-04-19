import { useEffect, useState } from 'react';

type Post = {
    id: number;
    title: string;
    authorId: number;
};

export function Post({ id }: { id: number}) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);

            })
            .catch(() => {
                setPost(null);
                setLoading(false);
                // return <Error />
            });
    }, []);

    if (loading) return <div style={{ border: '2px dashed red', padding: '10px'}}>Loading...</div>;
    if (!post) return <Error /> // <div>No post found</div>;

    return (
        <div style={{ padding: '10px' }}>
            <h2>Post ID: {post?.id}</h2>
            <p>Title: {post?.title}</p>
        </div>
    );
}

export function Error() {
    return (
        <div style={{ background: 'red', color: '#FFF', padding: '10px' }}>No Post found</div>
    );
}
