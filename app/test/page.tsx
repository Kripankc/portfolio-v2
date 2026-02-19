export default function TestPage() {
    return (
        <div style={{ padding: '50px', color: 'green', fontFamily: 'sans-serif' }}>
            <h1>Deployment Verification</h1>
            <p>If you can see this page, the GitHub Actions build pipeline is <strong>WORKING</strong>.</p>
            <p>Time: {new Date().toISOString()}</p>
        </div>
    )
}
